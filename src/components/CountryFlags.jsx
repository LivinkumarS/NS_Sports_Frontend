import React, { useEffect, useState } from "react";
import GetFlag from "./GetFlag";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HR } from "flowbite-react";

export default function CountryFlags() {
  const countries = [
    "IND",
    "AUS",
    "ENG",
    "ZAF",
    "NZL",
    "PAK",
    "LKA",
    "BGD",
    "AFG",
    "WIN",
    "ZWE",
    "IRL",
    "NLD",
    "NAM",
    "ARE",
    "NPL"
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="w-full mx-auto bg-white h-fit rounded-md">
      <h1 className="text-lg sm:text-xl font-bold text-center pt-2">
        Series
      </h1>
      <HR className="my-2 bg-black"/>
      <Slider {...settings} className="h-fit">
        {countries.map((coun, index) => (
          <div className="w-fit mx-3 md:mx-3 " key={index}>
            <GetFlag key={index} country_code={coun} />
            <h1 className="text-xs font-bold text-center w-20">{coun}</h1>
          </div>
        ))}
      </Slider>
    </div>
  );
}
