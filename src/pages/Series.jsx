import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Series() {
  const [orderedTours, setOrderedTours] = useState(null);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const apiURL = import.meta.env.VITE_API_URL;

  const groupTournamentsByMonth = (tournaments) => {
    return tournaments.reduce((acc, tournament) => {
      const startDate = new Date(tournament.start_date * 1000);
      const month = startDate.toLocaleString("default", { month: "long" });
      const year = startDate.getFullYear();
      const monthYear = `${month}_${year}`;

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(tournament);

      return acc;
    }, {});
  };

  const fetchTourList = async () => {
    try {
      const response = await fetch(
        `${apiURL}/api/cricket/featured-tournaments`,
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
        const sortedTours = data.data.tournaments.sort((a, b) => {
          a.start_date - b.start_date;
        });
        const monthwise = groupTournamentsByMonth(sortedTours);
        setOrderedTours(monthwise);
        console.log(monthwise);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchTourList();
  }, []);

  return (
    <div className="w-full min-h-[80vh]">
      <h1 className="text-2xl font-bold my-6 text-center">
          Series
        </h1>
      <div className="w-full max-w-[1100px] mx-auto p-3">
        <table className="w-full">
          <thead className="bg-blue-300">
            <tr>
              <th className="p-3 border border-gray-400">
                Month
              </th>
              <th className="p-3 border border-gray-400">
                Series
              </th>
            </tr>
          </thead>
          {orderedTours?
            Object.keys(orderedTours).map((monthKey) => (
              <tbody key={monthKey}>
                <tr>
                  <td className="border border-gray-300 p-2 text-sm sm:text-lg font-bold align-top sm:p-4">
                    {monthKey.replace('_'," ")}
                  </td>
                  <td className="border border-gray-300 p-2 sm:p-4">
                    {orderedTours[monthKey].map((tournament) => (
                      <Link to={`/tournament/${tournament.key}`} key={tournament.key}>
                        <div className="mb-4">
                          <p className="text-blue-500 text-sm sm:text-lg font-bold">
                            {tournament.name}
                          </p>
                          <p>{" "}
                            {new Date(
                              tournament.start_date * 1000
                            ).toDateString()}{" "}
                            <span> - </span>
                            {new Date(
                              tournament.last_scheduled_match_date * 1000
                            ).toDateString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </td>
                </tr>
              </tbody>
            )):<p className="font-semibold p-5">
            Loading Series...{` `}
            <Spinner
              size="sm"
              color="warning"
              aria-label="Warning spinner example"
            />
          </p>}
        </table>
      </div>
    </div>
  );
}
