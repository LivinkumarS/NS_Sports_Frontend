import React, { useEffect, useState } from "react";
import Tournament from "../components/Tournament";

export default function Schedule() {
  const [tours, setTours] = useState(null);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const [filteredList, setFilteredList] = useState([]);
  const [filterMethod, setFilterMethod] = useState(null);
  const [t20List, setT20List] = useState([]);
  const [odiList, setOdiList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [femaleList, setFemaleList] = useState([]);
  const apiURL = import.meta.env.VITE_API_URL;

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
        setTours(data);
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

  useEffect(() => {
    if (tours) {
      const data = tours.data.tournaments.filter((match) => {
        const startOfToday = Math.floor(new Date() / 1000);
        return match.last_scheduled_match_date > startOfToday;
      });
      setFilteredList(data);
    }
  }, [tours]);

  useEffect(() => {
    if (filteredList.length > 0) {
      setOdiList(
        filteredList.filter((tour) => {
          return tour.formats[0] === "oneday";
        })
      );
      setT20List(
        filteredList.filter((tour) => {
          return tour.formats[0] === "t20";
        })
      );
      setTestList(
        filteredList.filter((tour) => {
          return tour.formats[0] === "test";
        })
      );
      setFemaleList(
        filteredList.filter((tour) => {
          return tour.gender === "female";
        })
      );
    }
  }, [filteredList]);

  return (
    <div className="w-full min-h-[80vh]">
      <div className="w-full p-3">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Tournaments Schedule
        </h1>
        <div className="w-full mb-2 overflow-x-auto max-w-[1100px] mx-auto flex items-center flex-nowrap justify-start gap-3 px-3">
          <button
            onClick={() => {
              setFilterMethod(null);
            }}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold  rounded-xl ${filterMethod===null && "bg-blue-300"}`}
          >
            All
          </button>
          <button
            onClick={() => {
              setFilterMethod("odi");
            }}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold  rounded-xl ${filterMethod==="odi" && "bg-blue-300"}`}
          >
            ODI
          </button>
          <button
            onClick={() => {
              setFilterMethod("t20");
            }}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold  rounded-xl ${filterMethod==="t20" && "bg-blue-300"}`}
          >
            T20
          </button>
          <button
            onClick={() => {
              setFilterMethod("test");
            }}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold  rounded-xl ${filterMethod==="test" && "bg-blue-300"}`}
          >
            Test
          </button>
          <button
            onClick={() => {
              setFilterMethod("female");
            }}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl ${filterMethod==="female" && "bg-blue-300"}`}
          >
            Women
          </button>
        </div>
        {filteredList.length > 0 && (
          <div className="w-full max-w-[1100px] mx-auto">
            {filterMethod === null &&
              filteredList.map((tour, ind) => (
                <Tournament key={ind} tourKey={tour.key} />
              ))}
            {filterMethod === "odi" &&
              odiList.map((tour, ind) => (
                <Tournament key={ind} tourKey={tour.key} />
              ))}
            {filterMethod === "t20" &&
              t20List.map((tour, ind) => (
                <Tournament key={ind} tourKey={tour.key} />
              ))}
            {filterMethod === "test" &&
              testList.map((tour, ind) => (
                <Tournament key={ind} tourKey={tour.key} />
              ))}
            {filterMethod === "female" &&
              femaleList.map((tour, ind) => (
                <Tournament key={ind} tourKey={tour.key} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
