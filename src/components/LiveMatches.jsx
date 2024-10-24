import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "flowbite-react";
import GetFlag from "./GetFlag";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import LiveMatch from "./LiveMatch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const [loading, setLoading] = useState(true);
  const [slidesToShow, setSlidesToshow] = useState(1);
  const apiURL = import.meta.env.VITE_API_URL;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };

  const fetchFeaturedMatches = async () => {
    try {
      const response = await fetch(
        `${apiURL}/api/cricket/featured-matches-2`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectKey: projectKey,
            access_token: sessionStorage.getItem("access_token"),
          }),
        }
      );
      
      const data = await response.json();
      if (response.ok) {
        const liveMatches = data.data.matches.filter((match) => {
          return match.status === "started";
        });
        if (liveMatches.length > 2) {
          setSlidesToshow(3);
        } else {
          setSlidesToshow(liveMatches.length);
        }
        setMatches(liveMatches);
        setLoading(false);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    fetchFeaturedMatches();
  }, []);

  return (
    <>
      <div className="w-[full] z-0 bg-[#0077b6] rounded-md">
        {loading ? (
          <h1 className="text-white font-semibold p-5">
            Loading matches...{` `}
            <Spinner
              size="sm"
              color="warning"
              aria-label="Warning spinner example"
            />
          </h1>
        ) : matches.length > 0 ? (
          <Slider {...settings} className="w-full sm:m-0 bg-transparent p-3">
            {matches.map((match) => (
              <Link key={match.key} to={`/live/${match.key}`} className="lg:border-[10px] border-[#0077b6]">
                <LiveMatch matchKey={match.key} />
              </Link>
            ))}
          </Slider>
        ) : (
          <h1 className="text-lg text-gray-500 font-semibold">
            No Live Matches...!
          </h1>
        )}
      </div>
    </>
  );
}
