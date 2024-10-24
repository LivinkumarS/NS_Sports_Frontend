import React, { useEffect, useState } from "react";
import LiveMatches from "../components/LiveMatches";
import { GoDotFill } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import CompletedMatches from "../components/CompletedMatches";
import UpcomingMatches from "../components/UpcomingMatches";
import NewsGlimp from "../components/NewsGlimp";
import BlogGlimp from "../components/BlogGlimp";
import VideoGlimp from "../components/VideoGlimp";
import CountryFlags from "../components/CountryFlags";
import { HR } from "flowbite-react";

const Home = () => {
  const location = useLocation();
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const [key, setKey] = useState(null);
  const [liveMatches, setLiveMatches] = useState([]);
  const apiURL = import.meta.env.VITE_API_URL;
  

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

        setLiveMatches(liveMatches);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    const path = new URLSearchParams(location.search);
    if (path.has("tab")) {
      setKey(path.get("tab"));
    } else {
      setKey(null);
    }
  }, [location.search]);

  useEffect(() => {
    fetchFeaturedMatches();
  }, []);

  return (
    <div className="w-full px-3 sm:px-5 min-h-[80vh]">
      <div className="sm:mt-4 flex w-full flex-col gap-3 sm:gap-0 sm:items-start justify-center items-center sm:flex-row ">
        <div className="w-full mb-8">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between">
            <div className="flex w-full overflow-x-auto gap-0 justify-start items-center space-x-8 mt-4 mb-4">
              <Link to={"/"}>
                <h1 className="text-2xl font-bold text-red-600 flex gap-1 mb-2 whitespace-nowrap">
                  Live Matches{" "}
                  <span className="mt-[4px]">
                    <GoDotFill />
                  </span>
                </h1>
              </Link>
              <div className="flex items-center justify-start gap-2 sm:gap-4">
                {liveMatches.map((match, index) => (
                  <Link
                    to={`/live/${match.key}`}
                    key={index}
                    className="text-black font-semibold p-2 px-3 bg-blue-300 rounded-3xl text-xs lg:text-sm hover:bg-gray-300  whitespace-nowrap flex items-center gap-2"
                  >
                    {match.short_name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-[90%] sm:w-[200px] sm:gap-4 mb-5 flex gap-4 items-center justify-center">
              <Link to={"/?tab=completed"} className="flex-1">
                <button
                  className={`${
                    key === "completed" ? "bg-blue-300 " : "bg-white"
                  } w-full text-sm sm:text-md p-2 rounded-xl hover:bg-blue-300 cursor-pointer hover:text-white font-bold`}
                >
                  Completed
                </button>
              </Link>
              <Link to={"/?tab=upcoming"} className="flex-1">
                <button
                  className={`${
                    key === "upcoming" ? "bg-blue-300 " : "bg-white"
                  } w-full text-sm sm:text-md p-2 rounded-xl hover:bg-blue-300 cursor-pointer hover:text-white font-bold`}
                >
                  Upcoming
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full mx-auto  sm:p-4 h-fit">
            {!key ? (
              <LiveMatches />
            ) : key == "completed" ? (
              <CompletedMatches />
            ) : (
              <UpcomingMatches />
            )}
          </div>
        </div>
      </div>
      {/* News and Blogs */}
      <div className="mb-9 p-3 overflow-hidden flex flex-col bg-transparent gap-3 md:flex-row w-full rounded-lg max-w-[1200px] mx-auto">
        <div className="flex-1 rounded-lg bg-white p-4 w-full">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl md:text-2xl">Latest News</h1>
            <Link
              to={"/news"}
              className="text-blue-600 hover:underline font-semibold"
            >
              See More
            </Link>
          </div>
          <HR className="my-3 bg-[#ddd]"/>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            <Link to="/">
              <NewsGlimp
                image={
                  "https://images.thequint.com/thequint%2F2024-06%2F72841ac2-cc30-4843-a4bb-6d94eb5e4a34%2F09061_pti06_10_2024_000051b.jpg?auto=format%2Ccompress&fmt=webp&width=720&w=1200"
                }
                title={
                  "India Defeats Pakistan in Thrilling T20 World Cup Match"
                }
                date={"10/10/2024"}
              />
            </Link>
            <Link to="/">
              <NewsGlimp
                image={
                  "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_960,q_50/lsci/db/PICTURES/CMS/336500/336568.6.jpg"
                }
                title={
                  "Bangladesh Secures Historic Series Win Against South Africa"
                }
                date={"10/10/2024"}
              />
            </Link>
            <Link to="/">
              <NewsGlimp
                image={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT283m5qLpGCJnnUKLofeQpWgXCU7malgOPSw&s"
                }
                title={"New Zealand Stuns Australia with Last-Ball Victory"}
                date={"10/10/2024"}
              />
            </Link>
            <Link to="/">
              <NewsGlimp
                image={
                  "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_960,q_50/lsci/db/PICTURES/CMS/369800/369843.6.jpg"
                }
                title={
                  "WBBL 2024: Sydney Sixers Start the Season with a Big Win"
                }
                date={"10/10/2024"}
              />
            </Link>
            <Link to="/">
              <NewsGlimp
                image={
                  "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202409/pathum-nissanka-with-angelo-mathews-095108396-16x9_0.jpg?VersionId=plhiOZNNf.PCZTRmHL62GDTIjxuCFRMt&size=690:388"
                }
                title={
                  "England's Test Series Triumph Over Sri Lanka Breaks Records"
                }
                date={"10/10/2024"}
              />
            </Link>
            <Link to="/">
              <NewsGlimp
                image={
                  "https://media.crictracker.com/media/attachments/1718278459668_Team-India.jpeg"
                }
                title={"BCCI Announces Schedule for India's Home Season 2024"}
                date={"10/10/2024"}
              />
            </Link>
          </div>
        </div>
        <div className=" w-full rounded-lg bg-white md:w-[300px] p-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-bold text-lg md:text-xl">Latest Blogs</h1>
            <Link
              to={"/blogs"}
              className="text-blue-600 hover:underline font-semibold"
            >
              See More
            </Link>
          </div>
          <HR className="my-3 mb-0 bg-[#ddd]"/>
          <br />
          <div className="w-full grid grid-cols-1 gap-0">
            <Link to={"/blogs"}>
              <BlogGlimp
                image={
                  "https://www.bjsports.live/wp-content/uploads/2024/08/Family-Friendly-Broadcast.webp"
                }
                title={"How Live Cricket Telecasts Are Being Revolutionized"}
                date={"10/10/2024"}
              />
            </Link>
            <Link to={"/blog"}>
              <BlogGlimp
                image={
                  "https://static.cricbuzz.com/a/img/v1/i1/c378946/u19-world-cup-india-fail-to-cross-final-hurdle-after-stellar-campaign.jpg?d=high&p=det"
                }
                title={"Behind the Scenes: Bringing You Live Cricket Scores"}
                date={"10/10/2024"}
              />
            </Link>
            <Link to={"/blog"}>
              <BlogGlimp
                image={
                  "https://media.licdn.com/dms/image/v2/D4D12AQElhjdmE2Ql-A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1724934551680?e=2147483647&v=beta&t=i8CclKAONrjT90vie2_KXnmesQsgTIxY4jHha0wDnrk"
                }
                title={"The Future of Sports Streaming and Cricket Coverage"}
                date={"10/10/2024"}
              />
            </Link>
            <Link to={"/blog"}>
              <BlogGlimp
                image={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcVAVyEi1bj0BybovVVmWdxMGuGID-oSKs4w&s"
                }
                title={"Top 5 Features of the Best Cricket Streaming Apps"}
                date={"10/10/2024"}
              />
            </Link>
            <Link to={"/blog"}>
              <BlogGlimp
                image={
                  "https://blog.robosoftin.com/wp-content/uploads/2023/11/The_Future_of_Sports.jpg"
                }
                title={"How Real-Time Cricket News Keeps Fans Engaged"}
                date={"10/10/2024"}
              />
            </Link>
          </div>
        </div>
      </div>
      {/* Videos */}

      <div className="w-full max-w-[1200px] mx-auto p-3 mb-6">
        <VideoGlimp />
      </div>

      {/* country flags */}
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <CountryFlags />
      </div>
    </div>
  );
};

export default Home;
