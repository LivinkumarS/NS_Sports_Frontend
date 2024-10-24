import { HR, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GetFlag from "../components/GetFlag";

export default function TourDetails() {
  const { tourKey } = useParams();
  const [tourDetail, setTourDetail] = useState(null);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const fetchTourDetails = async () => {
    const apiURL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(
        `${apiURL}/api/cricket/tournament-fixtures`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectKey: projectKey,
            access_token: sessionStorage.getItem("access_token"),
            tourKey: tourKey,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTourDetail(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchTourDetails();
  }, []);

  return (
    <div className="w-full sm:p-4 min-h-[80vh]">
      {tourDetail ? (
        <div className="w-full max-w-[1200px] mx-auto my-4 p-4 sm:p-6">
          <h1 className="font-bold text-center sm:text-lg my-2 text-blue-600">
            {tourDetail.data.matches[0].tournament.name}
          </h1>
          <p className="mx-auto text-center">
            <strong>From: </strong>{" "}
            {new Date(
              tourDetail.data.matches[0].start_at * 1000
            ).toDateString()}{" "}
            <strong>To: </strong>{" "}
            {new Date(
              tourDetail.data.matches[tourDetail.data.matches.length - 1]
                .start_at * 1000
            ).toDateString()}
          </p>

          <div className="mx-auto p-2 sm:p-4 w-full">
            <h2 className="text-center mx-auto text-blue-600 font-bold">
              Matches
            </h2>
            <div className="sm:p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tourDetail.data.matches.map((match, ind) => (
                <Link
                  to={`/${match.status === "started" ? "live" : "match"}/${
                    match.key
                  }`}
                  key={match.key}
                >
                  <div
                    key={ind}
                    className="relative w-full p-2 rounded-lg shadow-lg py-4"
                  >
                    {match.status === "started" && (
                      <p className="text-red-600 font-semibold absolute top-2 left-2">
                        Live
                      </p>
                    )}
                    <h2 className="font-bold text-center text-blue-600">
                      {match.name}
                    </h2>
                    {match.sub_title && (
                      <p className="text-center">
                        {match.sub_title}{" "}
                        {new Date(match.start_at * 1000).toDateString()}
                      </p>
                    )}
                    <div className="top-0 right-0 w-full h-fit flex items-center justify-center p-3">
                      <div className="flex-1 w-2 flex flex-col items-center justify-center gap-0">
                        <GetFlag country_code={match.teams.a.country_code} />
                      </div>
                      <h6 className="w-fit h-fit">vs</h6>
                      <div className="flex-1 w-2 flex flex-col items-center justify-center gap-0">
                        <GetFlag country_code={match.teams.b.country_code} />
                      </div>
                    </div>
                    <p className="text-center">
                      <span className="font-bold">Venue: </span>
                      {match.venue.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="font-semibold p-5">
          Loading Tour Details...{` `}
          <Spinner
            size="sm"
            color="warning"
            aria-label="Warning spinner example"
          />
        </p>
      )}
    </div>
  );
}
