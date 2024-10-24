import React from "react";

export default function BlogGlimp({ image, title, date }) {
  return (
    <div className="w-full gap-2 p-2 rounded-lg flex items-center justify-center">
      <img src={image} alt="" className="w-[100px]" />
      <div className="flex-1 flex flex-col items-start">
        <p className="text-sm sm:text-md font-semibold">{title}</p>
        <p className="text-gray-500 text-xs">{date}</p>
      </div>
    </div>
  );
}
