import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Progress } from "flowbite-react";
import { app } from "../firebase";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { BiError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageUploadingProgress, setImageUploadingProgress] = useState(0);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = localStorage.getItem("access_token");
  const apiURL = import.meta.env.VITE_API_URL;

  async function handleUploadImage() {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setErrorMessage("File Size Must Be Under 2MB");
        console.log(error);
        
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  }

  async function handlePostSubmit(e) {
    e.preventDefault();
    setErrorMessage(null);

    if (
      formData.content === "" ||
      !formData.image ||
      !formData.title ||
      !formData.content ||
      formData.title === ""
    ) {
      return setErrorMessage("All Fields Are Required!");
    }

    try {
      const res = await fetch(`${apiURL}/api/blog/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const response = await res.json();
      if (res.ok) {
        navigate(`/post/${response.slug}`);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="p-3 max-w-3xl min-h-[80vh] mx-auto">
      <h1 className="font-bold text-center my-7 text-3xl">Create Blog</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between p-3">
          <FileInput
            type="file"
            accept="image/*"
            className="flex-1"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
            }}
          />
          <Button
            type="button"
            color={"blue"}
            disabled={!imageFile || imageUploadingProgress}
            onClick={handleUploadImage}
          >
            {imageUploadingProgress > 0 && imageUploadingProgress < 100
              ? "Loading..."
              : "Upload"}
          </Button>
        </div>
        {imageUploadingProgress > 0 && (
          <Progress progress={imageUploadingProgress} />
        )}
        <div hidden={!imageFileURL} className="h-60 w-fit mx-auto relative">
          <img
            src={imageFileURL}
            alt="Post Image"
            onClick={() => {
              setImageFileURL(null);
              setImageFile(null);
              setImageUploadingProgress(0);
            }}
            className="w-full h-full cursor-pointer"
          />
        </div>

        <ReactQuill
          id="content"
          theme="snow"
          className="h-20"
          placeholder="Write Something About You Post..!"
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <button
          type="submit"
          className="w-100 mt-16 sm:mt-12 mb-12 bg-[#0077b6] p-2 rounded-lg text-white"
          outline
          onClick={handlePostSubmit}
          disabled={
            !imageUploadingProgress === 0 && imageUploadingProgress < 100
          }
        >
          Upload
        </button>
      </form>
      {errorMessage && (
        <Alert color={"red"} className="mt-4" icon={BiError}>
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}
