import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import GetFlag from "./GetFlag";

export default function LiveMatch({ matchKey }) {
  const [matchDetails, setMatchDetails] = useState(null);
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [firstBat, setFirstBat] = useState(null);
  const [secondBat, setSecondBat] = useState(null);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const apiURL = import.meta.env.VITE_API_URL;

  const fetchMatchDetails = async () => {
    try {
      const response = await fetch(
        `${apiURL}/api/cricket/match`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matchKey: matchKey,
            projectKey: projectKey,
            access_token: sessionStorage.getItem("access_token"),
          }),
        }
      );
      const data = await response.json();

      setMatchDetails(data);

      if (data.data.play && data.data.play.first_batting === "a") {
        setTeamA(data.data.teams.a.code);
        setTeamB(data.data.teams.b.code);
        setFirstBat("a");
        setSecondBat("b");
      } else {
        setTeamA(data.data.teams.b.code);
        setTeamB(data.data.teams.a.code);
        setFirstBat("b");
        setSecondBat("a");
      }
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchMatchDetails();
    const intervalId = setInterval(() => {
      fetchMatchDetails();
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    matchDetails && (
      <div className="sm:p-5 sm:py-8 py-5 w-full lg:h-[320px] overflow-y-auto rounded-lg bg-white relative ">
        <h1 className="absolute top-1 left-1 sm:top-2 sm:left-2  text-xs sm:text-sm font-bold text-red-600 flex gap-1">
          Live Match{" "}
          <span className="mt-[3px]">
            <GoDotFill />
          </span>
        </h1>
        <h1 className="text-center text-md sm:text-lg font-bold">
          {matchDetails.data.tournament.name}
          <p className="text-gray-500 text-xs sm:text-sm">
            {matchDetails.data.sub_title}{" "}
            {matchDetails.data.format === "test" && (
              <span>Day: {matchDetails.data.play.day_number}</span>
            )}
          </p>
        </h1>
        <h1 className="text-center text-sm sm:text-md font-bold ">
          {matchDetails.data.name}
        </h1>
        <div className="w-full flex items-stretch justify-center p-3">
          <div className="flex-1 flex flex-col items-center justify-center gap-0">
            <GetFlag
              country_code={matchDetails.data.teams[firstBat].country_code}
            />
            <h1 className="text-center text-sm sm:text-md font-bold ">
              {teamA}
            </h1>
            {matchDetails.data.play ? (
              <h6 className="text-sm font-semibold">
                {matchDetails.data.play.innings[`${firstBat}_1`].score_str}
              </h6>
            ) : (
              <h6 className="text-sm font-semibold">Yet To Bat</h6>
            )}
          </div>
          <h6 className="w-fit h-fit">vs</h6>
          <div className="flex-1 flex flex-col items-center justify-center gap-0">
            <GetFlag
              country_code={matchDetails.data.teams[secondBat].country_code}
            />
            <h1 className="text-center text-sm sm:text-md font-bold ">
              {teamB}
            </h1>
            {matchDetails.data.play ? (
              <h6 className="text-sm font-semibold">
                {matchDetails.data.play.innings[`${secondBat}_1`].score_str}
              </h6>
            ) : (
              <h6 className="text-sm font-semibold">Yet to Bat</h6>
            )}
          </div>
        </div>
        {matchDetails.data.play ? null : (
          <h1 className="text-center text-sm sm:text-md font-bold">
            Expected Start At{" "}
            {new Date(
              matchDetails.data.expected_start_at * 1000
            ).toLocaleTimeString()}
          </h1>
        )}

        <h1 className="text-center text-sm sm:text-md font-bold">
          {matchDetails.data.venue.name}
        </h1>
      </div>
    )
  );
}
