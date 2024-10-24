import React, { useEffect, useState } from "react";
import wi from "../assets/images/wi.webp";

export default function GetFlag({ country_code }) {
  const [teamFlag, setTeamFlag] = useState(null);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const apiURL = import.meta.env.VITE_API_URL;

  const fetchFlag = async () => {
    if (country_code === "WIN" || !country_code) {
      setTeamFlag("WIN");
      return;
    }
    try {
      const response = await fetch(
        `${apiURL}/api/cricket/get-flag`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            countryCode: country_code,
            projectKey: projectKey,
            access_token: sessionStorage.getItem("access_token"),
          }),
        }
      );

      const data = await response.json();
      setTeamFlag(data);
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchFlag();
  }, []);

  return (
    <div>
      {teamFlag !== "WIN" ? (
        <div
          className="w-20 h-24 overflow-hidden flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: teamFlag }}
        />
      ) : (
        <div className="w-20 h-24 overflow-hidden flex items-center justify-center">
          <img className="" src={`${wi}`} width="70" />
        </div>
      )}
    </div>
  );
}
