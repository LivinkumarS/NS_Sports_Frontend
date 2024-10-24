// MatchDetails.jsx (Detailed Match Page)

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetFlag from "../components/GetFlag";
import ScoreCard from "../components/ScoreCard";
import { Spinner } from "flowbite-react";

const MatchDetails = () => {
  const { matchKey } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [firstBat, setFirstBat] = useState(null);
  const [secondBat, setSecondBat] = useState(null);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const [activeTeamTab, setActiveTeamTab] = useState("teamA");
  const apiURL = import.meta.env.VITE_API_URL;

  const handleTeamTabChange = (tab) => {
    setActiveTeamTab(tab);
  };

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
      if (response.ok) {
        setMatchDetails(data);

        if (data.data.status !== "not_started") {
          if (data.data.play.first_batting === "a") {
            setTeamA(data.data.teams.a.name);
            setTeamB(data.data.teams.b.name);
            setFirstBat("a");
            setSecondBat("b");
          } else {
            setTeamA(data.data.teams.b.name);
            setTeamB(data.data.teams.a.name);
            setFirstBat("b");
            setSecondBat("a");
          }
        } else {
          setTeamA(data.data.teams.a.name);
          setTeamB(data.data.teams.b.name);
          setFirstBat("a");
          setSecondBat("b");
        }
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchMatchDetails();
  }, [matchKey]);

  return (
    <div className="min-h-[80vh] container mx-auto sm:p-4">
      {matchDetails ? (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl sm:m-[5%] sm:mx-auto p-4 flex flex-col gap-1 items-center justify-center">
          <p className="text-xs font-bold text-gray-500 self-start">
            {new Date(matchDetails.data.start_at * 1000).toLocaleString()}
          </p>
          <h1 className="text-md sm:text-lg font-bold text-center">
            {matchDetails.data.title}
          </h1>
          <h1>{matchDetails.data.name}</h1>
          <div className="w-full flex items-center justify-center p-3">
            <div className="flex-1 flex flex-col items-center justify-center gap-0">
              <GetFlag
                country_code={matchDetails.data.teams[firstBat].country_code}
              />
              <p className="text-xs sm:text-sm sm:text-md">{teamA}</p>
              {matchDetails.data.status !== "not_started" && (
                <p>
                  {matchDetails.data.play.innings[`${firstBat}_1`].score_str}
                </p>
              )}
            </div>
            <p className="w-fit h-fit">vs</p>
            <div className="flex-1 flex flex-col items-center justify-center gap-0">
              <GetFlag
                country_code={matchDetails.data.teams[secondBat].country_code}
              />
              <p className="text-xs sm:text-sm sm:text-md">{teamB}</p>
              {matchDetails.data.status !== "not_started" && (
                <p>
                  {matchDetails.data.play.innings[`${secondBat}_1`].score_str}
                </p>
              )}
            </div>
          </div>
          {matchDetails.data.status !== "not_started" && (
            <p className="text-sm sm:text-md text-gray-500 font-semibold text-center">
              {matchDetails.data.teams[matchDetails.data.toss.winner].name} won
              the toss and Chose to {matchDetails.data.toss.elected}
            </p>
          )}
          {matchDetails.data.status !== "started" &&
            matchDetails.data.status !== "not_started" && (
              <p className="text-sm sm:text-md font-semibold text-center">
                {matchDetails.data.play.result.msg}
              </p>
            )}

          <p className="text-sm text-gray-500 sm:text-md font-semibold text-center">
            {matchDetails.data.venue.name}
          </p>

          <div className="container mx-auto">
            <div className="flex border-b border-gray-300">
              <button
                className={`flex-1 py-2 text-sm sm:text-md text-center font-semibold ${
                  activeTeamTab === "teamA"
                    ? "text-[#0077b6] border-b-2 border-[#0077b6]"
                    : "text-gray-600"
                }`}
                onClick={() => handleTeamTabChange("teamA")}
              >
                {teamA}
              </button>
              <button
                className={`flex-1 py-2 text-sm sm:text-md text-center font-semibold ${
                  activeTeamTab === "teamB"
                    ? "text-[#0077b6] border-b-2 border-[#0077b6]"
                    : "text-gray-600"
                }`}
                onClick={() => handleTeamTabChange("teamB")}
              >
                {teamB}
              </button>
            </div>
            <div className="w-full">
              {activeTeamTab === "teamA" ? (
                <ScoreCard mathDetail={matchDetails} team={"a"} />
              ) : (
                <ScoreCard mathDetail={matchDetails} team={"b"} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="font-semibold p-5">
            Loading Match Details...{` `}
            <Spinner
              size="sm"
              color="warning"
              aria-label="Warning spinner example"
            />
          </p>
      )}
    </div>
  );
};

export default MatchDetails;
