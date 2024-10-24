import { HR } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function VideoGlimp() {
  const videos = [
    {
      title: "Greatest Cricket Chases Ever",
      videoUrl: "https://www.youtube.com/embed/o4qnuo2Z8dQ?si=3DCkyDd9WbQgFnuB",
    },
    {
      title: "Legendary Bowling Performances",
      videoUrl: "https://www.youtube.com/embed/F0_aypvtW8Y?si=Y_wb3Yn0XUxYKCiw",
    },
    {
      title: "Top Cricket Batting Skills",
      videoUrl: "https://www.youtube.com/embed/HEHggOOds1w?si=lJqQckSAXFSd7m0v",
    },
    {
      title: "Cricket World Cup Best Moments",
      videoUrl: "https://www.youtube.com/embed/fBIqzpkaIy8?si=qziqQzuEo1RhATmd",
    },
    {
      title: "Most Memorable Sixes in Cricket",
      videoUrl: "https://www.youtube.com/embed/pAdQ_cxazn4?si=mmBqyLuG4BA8Bxp0",
    },
    {
      title: "The Evolution of Cricket",
      videoUrl: "https://www.youtube.com/embed/OZEi6HAosrI?si=ovGsCo0LjHFyBkhl",
    },
  ];

  return (
    <div className="w-full rounded-lg bg-white p-4 mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-3xl font-bold ">Recent Videos</h2>
        <Link
          to={`/videos`}
          className="text-blue-600 hover:underline text-md sm:text-lg md:text-xl font-bold mb-3"
        >
          See More
        </Link>
      </div>
      <HR className="my-3 bg-[#ddd]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-full h-full relative">
              <iframe
                width="100%"
                height="225"
                src={video.videoUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-t-lg"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
