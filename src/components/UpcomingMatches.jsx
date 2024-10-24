import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetFlag from "./GetFlag";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function UpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const [loading, setLoading] = useState(true);
  const apiURL = import.meta.env.VITE_API_URL;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots:false,
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
        const fMatches = data.data.matches.filter((match) => {
          return (
            match.teams.a.country_code &&
            match.teams.b.country_code &&
            match.status === "not_started"
          );
        });

        setMatches(fMatches);
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
    <div className="w-full">
      {loading ? (
        <p className="p-4">
          Loading matches...{` `}
          <Spinner
            size="sm"
            color="warning"
            aria-label="Warning spinner example"
          />
        </p>
      ) : matches.length > 0 ? (
        <>
          <h1 className="text-lg sm:text-xl font-bold mb-4">
            Upcoming Matches({matches.length})
          </h1>
          <Slider {...settings} className="sm:m-0 bg-transparent p-3">
            {matches.map((match) => (
              <Link to={`/match/${match.key}`} key={match.key}>
                <div
                  className="flex sm:mx-2 flex-col h-[280px] overflow-y-auto p-2 sm:p-5 gap-1 rounded-lg border border-gray-200 bg-white shadow-md"
                  key={match.key}
                >
                  <div className="top-0 right-0 w-full h-fit flex items-center justify-center p-3">
                    <div className="flex-1 w-2 flex flex-col items-center justify-center gap-0">
                      <GetFlag country_code={match.teams.a.country_code} />
                    </div>
                    <h6 className="w-fit h-fit">vs</h6>
                    <div className="flex-1 w-2 flex flex-col items-center justify-center gap-0">
                      <GetFlag country_code={match.teams.b.country_code} />
                    </div>
                  </div>

                  <h1 className="text-xl text-center font-bold">
                    {match.tournament.name}{" "}
                    <span className="text-sm text-gray-500 font-semibold">
                      ({match.format.toUpperCase()})
                    </span>
                  </h1>
                  <h2 className="text-md text-start m-0 font-bold">
                    {match.name}
                  </h2>
                  <h6>
                    <span className="font-bold">Venue: </span>
                    {match.venue.name}
                  </h6>
                </div>
              </Link>
            ))}
          </Slider>
        </>
      ) : (
        <h6>No featured matches available.</h6>
      )}
    </div>
  );
}
