import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function News() {
  const initialPosts = [
    {
      id: 1,
      title: "Exciting Match: Team A vs Team B",
      content:
        "Team A won by 5 wickets in a thrilling match that had everyone on the edge of their seats. Team B put up a good fight, but Team A's batsmen made sure to chase down the target in the final overs. The game featured stunning performances from both teams, especially in the fielding department, and fans are already looking forward to their next clash.",
      date: "October 21, 2024",
      author: "Anu",
      image: "https://via.placeholder.com/150",
      slug: "exciting-match-team-a-vs-team-b",
    },
    {
      id: 2,
      title: "Breaking News: Player X Injured",
      content:
        "Player X was injured during the recent match while fielding near the boundary. The injury occurred when he collided with a teammate while attempting to catch the ball. Medical reports suggest a minor sprain, but Player X will be out of action for at least a week. This news is a significant setback for the team, as they were relying on his all-rounder skills.",
      date: "October 20, 2024",
      author: "Anu",
      image: "https://via.placeholder.com/150",
      slug: "breaking-news-player-x-injured",
    },
    {
      id: 3,
      title: "Upcoming Tournaments for 2025",
      content:
        "Here’s a preview of the exciting tournaments coming up in 2025. With several teams gearing up for the international stage, fans can expect a jam-packed year of cricket action. The tournament schedule includes the ICC World Cup, regional championships, and several bilateral series that will keep fans entertained throughout the year. Stay tuned for more updates.",
      date: "October 19, 2024",
      author: "Saala",
      image: "https://via.placeholder.com/150",
      slug: "upcoming-tournaments-for-2025",
    },
    {
      id: 4,
      title: "Match Analysis: Team C vs Team D",
      content:
        "A deep dive into the strategies used in the match between Team C and Team D reveals some intriguing insights. Team C focused heavily on their bowling attack, while Team D's batsmen tried to keep the pressure on. The match saw some excellent boundary-saving fielding, with Team C eventually winning due to their superior bowling strategy. Both teams will be analyzing their performance ahead of their next game.",
      date: "October 18, 2024",
      author: "Saala",
      image: "https://via.placeholder.com/150",
      slug: "match-analysis-team-c-vs-team-d",
    },
    {
      id: 5,
      title: "Player Z Retirement Announcement",
      content:
        "Player Z has officially announced his retirement from international cricket. After a career spanning over a decade, Player Z has decided to hang up his boots. Known for his calm demeanor and powerful shots, Player Z will leave behind a legacy that fans will remember for years. The cricketing world has been quick to honor his contributions to the game.",
      date: "October 17, 2024",
      author: "Arun",
      image: "https://via.placeholder.com/150",
      slug: "player-z-retirement-announcement",
    },
    {
      id: 6,
      title: "Team E’s Unexpected Victory",
      content:
        "Team E’s underdog victory took everyone by surprise in last night’s match. Coming into the game as clear outsiders, Team E managed to defeat Team F with a well-rounded performance. Strong bowling backed by excellent fielding saw Team E restrict their opponents to a low score, which they chased down comfortably. Fans are calling it one of the best matches of the season.",
      date: "October 16, 2024",
      author: "Arun",
      image: "https://via.placeholder.com/150",
      slug: "team-e-unexpected-victory",
    },
    {
      id: 7,
      title: "Team F vs Team G: Key Moments",
      content:
        "Let’s revisit the key moments in Team F vs Team G, a match full of excitement. From the early breakthroughs in the powerplay to the incredible partnership in the middle overs, both teams showed their class. However, Team F’s strong bowling performance in the final overs turned the game in their favor. The match will be remembered for its unpredictability.",
      date: "October 15, 2024",
      author: "Naveen",
      image: "https://via.placeholder.com/150",
      slug: "team-f-vs-team-g-key-moments",
    },
    {
      id: 8,
      title: "Analyzing Team H’s Performance",
      content:
        "Team H’s performance in the recent tournament has been nothing short of impressive. Known for their aggressive batting and disciplined bowling, Team H has consistently been outperforming their opponents. With their star player back in form, they look set to dominate the next series. In this article, we break down their strengths and weaknesses.",
      date: "October 14, 2024",
      author: "Naveen",
      image: "https://via.placeholder.com/150",
      slug: "analyzing-team-h-performance",
    },
    {
      id: 9,
      title: "Star Player Performance Highlights",
      content:
        "Highlights of the top players from this season showcase their incredible skill and consistency. From stunning centuries to mind-blowing bowling spells, these players have set the benchmark for excellence in the league. This article covers the top performers who have been pivotal in their teams' success.",
      date: "October 13, 2024",
      author: "Kamal",
      image: "https://via.placeholder.com/150",
      slug: "star-player-performance-highlights",
    },
    {
      id: 10,
      title: "Team I and Team J: Rivalry Renewed",
      content:
        "A closer look at the ongoing rivalry between Team I and Team J reveals decades of competitive matches and intense showdowns. With both teams neck and neck in the current standings, their next face-off is sure to be an exciting one. Fans of both sides are eagerly awaiting the renewal of one of the biggest rivalries in cricket.",
      date: "October 12, 2024",
      author: "Kamal",
      image: "https://via.placeholder.com/150",
      slug: "team-i-vs-team-j-rivalry-renewed",
    },
    {
      id: 11,
      title: "Captain’s Insight on Upcoming Matches",
      content:
        "The captain shares his thoughts on the upcoming fixtures, highlighting the key challenges his team will face. With several crucial matches ahead, the captain remains optimistic about their chances, stressing the importance of teamwork and strategy. In this exclusive interview, he also talks about the new players who have joined the squad.",
      date: "October 11, 2024",
      author: "Praveen",
      image: "https://via.placeholder.com/150",
      slug: "captain-insight-upcoming-matches",
    },
    {
      id: 12,
      title: "Player of the Month: October 2024",
      content:
        "Find out who has been named Player of the Month for October 2024. This star player has delivered outstanding performances in both batting and bowling, making him a standout in the league. His contributions have led his team to several victories this month. Fans and experts alike have praised his all-around abilities.",
      date: "October 10, 2024",
      author: "Praveen",
      image: "https://via.placeholder.com/150",
      slug: "player-of-the-month-october-2024",
    },
    {
      id: 13,
      title: "Team K Dominates in the Finals",
      content:
        "Team K’s dominant performance in the finals left no doubt about their superiority. The team executed their game plan flawlessly, with their bowlers taking early wickets and their batsmen chasing down the target with ease. This victory marks their third championship win in five years, further solidifying their place as one of the best teams in the league.",
      date: "October 9, 2024",
      author: "Rose",
      image: "https://via.placeholder.com/150",
      slug: "team-k-dominates-finals",
    },
    {
      id: 14,
      title: "In-Depth: Team L’s Tactics",
      content:
        "An analysis of Team L’s tactical approach this season highlights their focus on building partnerships and conserving wickets in the early overs. Their bowlers have also been exceptional in the death overs, restricting opponents to low scores. With these strategies in place, Team L looks set for a successful season.",
      date: "October 8, 2024",
      author: "Rose",
      image: "https://via.placeholder.com/150",
      slug: "team-l-tactics-analysis",
    },
  ];

  const [posts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAuthorFilter = (e) => {
    setAuthorFilter(e.target.value);
  };

  const handleDateRangeFilter = (e) => {
    setDateRangeFilter(e.target.value);
  };

  const isWithinDateRange = (postDate, range) => {
    const today = new Date();
    const postDateObj = new Date(postDate);

    switch (range) {
      case "today":
        return postDateObj.toDateString() === today.toDateString();

      case "this-week": {
        const startOfWeek = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));
        return postDateObj >= startOfWeek && postDateObj <= endOfWeek;
      }

      case "this-month": {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        return postDateObj >= startOfMonth && postDateObj <= endOfMonth;
      }

      default:
        return true;
    }
  };

  const filteredPosts = initialPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (authorFilter
        ? post.author.toLowerCase().includes(authorFilter.toLowerCase())
        : true) &&
      (dateRangeFilter ? isWithinDateRange(post.date, dateRangeFilter) : true)
    );
  });

  return (
    <div className="news-page bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-[#0077b6] mb-8">
        Latest News
      </h1>

      <div className="filters max-w-[1200px] mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={handleSearch}
          className="rounded-lg text-xs sm:text-[15px] sm:flex-1 sm:p-3 border-0 shadow-lg rounden-xl w-full md:w-1/5 focus:ring-[#0077b6] focus:border-[#0077b6]"
        />
        <input
          type="text"
          placeholder="Search Author..."
          value={authorFilter}
          onChange={handleAuthorFilter}
          className="rounded-lg text-xs sm:text-[15px] sm:flex-1 sm:p-3 border-0 shadow-lg rounden-xl w-full md:w-1/5 focus:ring-[#0077b6] focus:border-[#0077b6]"
        />

        <select
          value={dateRangeFilter}
          onChange={handleDateRangeFilter}
          className="rounded-lg text-xs sm:text-[15px]  sm:p-3 border-0 shadow-lg rounden-xl w-full md:w-1/5 focus:ring-[#0077b6] focus:border-[#0077b6]"
        >
          <option value="">Filter by date</option>
          <option value="today">Today</option>
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
        </select>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            to={`/newspost/${post.slug}`}
            key={post.id}
            className="news-post bg-white rounded-lg shadow-lg p-3 transition-transform transform hover:scale-105"
          >
            <img
              src={post.image}
              alt={post.title}
              className="mb-4 w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-lg sm:text-xl font-semibold text-[#0077b6]">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500">
              {post.date} | {post.author}
            </p>
            <p className="mb-2 text-gray-700">
              {post.content.substring(0, 100)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
