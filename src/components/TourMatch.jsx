import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TourMatch({ matchKey }) {
  const [matchDetail, setMatchDetail] = useState(null);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const [matchLink, setMatchLink] = useState("");
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
      if (response.ok) {
        setMatchDetail(data);
        if (data.data.status === "started") {
          setMatchLink(`/live/${data.data.key}`);
        } else {
          setMatchLink(`/match/${data.data.key}`);
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
  }, []);

  return matchDetail && matchDetail.data.status !== "completed" ? (
    <tr className="bg-white border-b">
      <td className="px-6 py-4">
        <Link to={matchLink}>
          {matchDetail.data.short_name}{" "}
          {matchDetail.data.sub_title && matchDetail.data.sub_title}
          {matchDetail.data.status === "started" && (
            <div className="flex items-center justify-start text-red-600 gap-2">
              <p className="text-red-600 font-bold">Live</p>
              <FaDotCircle className="text-xs" />
            </div>
          )}
        </Link>
      </td>
      <td className="px-6 py-4">
        <Link to={matchLink}>
          {new Date(matchDetail.data.start_at * 1000).toDateString()}{" "}
          <br />
          {new Date(matchDetail.data.start_at * 1000).toLocaleTimeString()}
        </Link>
      </td>
      <td className="px-6 py-4">
        <Link to={matchLink}>{matchDetail.data.venue.name}</Link>
      </td>
    </tr>
  ) : null;
}
