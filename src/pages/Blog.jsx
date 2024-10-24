import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Blog() {
  const initialPosts = [
    {
      id: 1,
      title: "Exciting Match: Team A vs Team B",
      content:
        "Team A won by 5 wickets in a thrilling match that had spectators on the edge of their seats. Both teams put up a fierce competition, but Team A's middle-order batting line-up proved too strong for Team B's bowling attack. Despite a valiant effort from Team B, Team A chased down the target with a few overs to spare. Fans are already looking forward to the next face-off between these teams!",
      date: "October 21, 2024",
      author: "Anu",
      image:
        "https://images.thequint.com/thequint%2F2024-06%2F72841ac2-cc30-4843-a4bb-6d94eb5e4a34%2F09061_pti06_10_2024_000051b.jpg?auto=format%2Ccompress&fmt=webp&width=720&w=1200",
      slug: "exciting-match-team-a-vs-team-b",
    },
    {
      id: 2,
      title: "Breaking News: Player X Injured",
      content:
        "Player X was injured during the recent match against Team Y, raising concerns about their participation in upcoming tournaments. The injury occurred while fielding near the boundary, with medical staff rushing to attend to the player immediately. Early reports suggest a sprain, though further medical evaluation is needed. Fans and teammates are hoping for a speedy recovery, but Player X might have to sit out for the rest of the season.",
      date: "October 20, 2024",
      author: "Anu",
      image:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_960,q_50/lsci/db/PICTURES/CMS/336500/336568.6.jpg",
      slug: "breaking-news-player-x-injured",
    },
    {
      id: 3,
      title: "Upcoming Tournaments for 2025",
      content:
        "Here’s a preview of the exciting tournaments lined up for 2025. With several international competitions and domestic leagues in the calendar, cricket fans have a lot to look forward to. Teams are already gearing up for pre-season training, and key players are expected to shine. Notable tournaments include the World Test Championship finals, T20 World Cup, and various franchise-based leagues that will bring intense cricketing action throughout the year.",
      date: "October 19, 2024",
      author: "Saala",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT283m5qLpGCJnnUKLofeQpWgXCU7malgOPSw&s",
      slug: "upcoming-tournaments-for-2025",
    },
    {
      id: 4,
      title: "Match Analysis: Team C vs Team D",
      content:
        "In this match analysis, we take a deep dive into the strategies used by both Team C and Team D. Team C's aggressive batting approach was a key highlight, while Team D relied on their disciplined bowling attack to maintain pressure. The game saw several momentum shifts, making it a highly competitive fixture. Key players from both sides contributed significantly, but ultimately, Team C's resilience saw them through to victory.",
      date: "October 18, 2024",
      author: "Saala",
      image:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_960,q_50/lsci/db/PICTURES/CMS/369800/369843.6.jpg",
      slug: "match-analysis-team-c-vs-team-d",
    },
    {
      id: 5,
      title: "Player Z Retirement Announcement",
      content:
        "Player Z, one of the most iconic players in the sport, has officially announced his retirement. After a stellar career spanning over two decades, Player Z has decided to hang up his boots. Fans and fellow cricketers have taken to social media to express their admiration and share memories of his greatest performances. Player Z leaves behind a legacy of unmatched sportsmanship, leadership, and several records that will be hard to break.",
      date: "October 17, 2024",
      author: "Anu",
      image:
        "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202409/pathum-nissanka-with-angelo-mathews-095108396-16x9_0.jpg?VersionId=plhiOZNNf.PCZTRmHL62GDTIjxuCFRMt&size=690:388",
      slug: "player-z-retirement-announcement",
    },
    {
      id: 6,
      title: "Team E’s Unexpected Victory",
      content:
        "Team E’s underdog victory took everyone by surprise in the recent match against Team F. Despite being labeled the weaker side, Team E pulled off an extraordinary win, thanks to a brilliant bowling performance that dismantled Team F’s strong batting line-up. Their captain's leadership and strategic changes on the field made all the difference. This victory has opened up possibilities for Team E in the upcoming stages of the tournament.",
      date: "October 16, 2024",
      author: "Anu",
      image:
        "https://media.crictracker.com/media/attachments/1718278459668_Team-India.jpeg",
      slug: "team-e-unexpected-victory",
    },
    {
      id: 7,
      title: "Team F vs Team G: Key Moments",
      content:
        "Let’s revisit the key moments in the thrilling contest between Team F and Team G. This match was packed with exciting plays, from stunning catches to last-over drama. Team G’s top-order collapse was one of the turning points, but their bowlers kept them in the game until the very end. Team F’s lower-order batsmen held their nerve, securing a close win that will be remembered for its nail-biting finish.",
      date: "October 15, 2024",
      author: "Saala",
      image:
        "https://images.thequint.com/thequint%2F2024-06%2F72841ac2-cc30-4843-a4bb-6d94eb5e4a34%2F09061_pti06_10_2024_000051b.jpg?auto=format%2Ccompress&fmt=webp&width=720&w=1200",
      slug: "team-f-vs-team-g-key-moments",
    },
    {
      id: 8,
      title: "Analyzing Team H’s Performance",
      content:
        "Team H’s performance in the recent tournament was a mixed bag. While their top-order batting remained consistent, their middle-order crumbled under pressure in several matches. Despite this, their bowling unit was outstanding, with fast bowlers regularly picking up early wickets. The team's coaching staff will need to work on stabilizing the middle order before the next tournament. Overall, Team H showed promise, but they need to work on key areas.",
      date: "October 14, 2024",
      author: "Anu",
      image:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_960,q_50/lsci/db/PICTURES/CMS/336500/336568.6.jpg",
      slug: "analyzing-team-h-performance",
    },
    {
      id: 9,
      title: "Star Player Performance Highlights",
      content:
        "This season has been nothing short of spectacular for several star players. From match-winning innings to hat-trick bowling performances, this season's top players have delivered incredible moments. Among them, Player Q’s consistent scoring and Player R’s remarkable bowling stand out as the most memorable. Fans are eagerly awaiting their next appearances on the field, hoping for even more thrilling performances as the season progresses.",
      date: "October 13, 2024",
      author: "Saala",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT283m5qLpGCJnnUKLofeQpWgXCU7malgOPSw&s",
      slug: "star-player-performance-highlights",
    },
    {
      id: 10,
      title: "Team I and Team J: Rivalry Renewed",
      content:
        "The longstanding rivalry between Team I and Team J continues to thrill cricket fans. Their latest encounter saw a fiercely fought match with both sides leaving everything on the field. Team J’s bowling attack seemed to have the upper hand, but Team I’s batsmen fought back to make it a close contest. This rivalry has produced some of the best matches in recent years, and this latest edition did not disappoint.",
      date: "October 12, 2024",
      author: "Anu",
      image:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_960,q_50/lsci/db/PICTURES/CMS/369800/369843.6.jpg",
      slug: "team-i-and-team-j-rivalry-renewed",
    },
    {
      id: 11,
      title: "Captain’s Insight on Upcoming Matches",
      content:
        "The captain shares his thoughts on the upcoming fixtures, focusing on the challenges his team will face and how they plan to overcome them. He highlights key players to watch out for and the strategies the team is likely to employ. He remains optimistic about his team’s chances in the tournament, believing that with a balanced combination of experienced players and young talent, they have what it takes to go all the way.",
      date: "October 11, 2024",
      author: "Saala",
      image:
        "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202409/pathum-nissanka-with-angelo-mathews-095108396-16x9_0.jpg?VersionId=plhiOZNNf.PCZTRmHL62GDTIjxuCFRMt&size=690:388",
      slug: "captains-insight-upcoming-matches",
    },
    {
      id: 12,
      title: "Player of the Month: October 2024",
      content:
        "Find out who has been named Player of the Month for October 2024. This player’s outstanding performances have earned them the top spot, with contributions in both batting and bowling. Their consistent displays of skill and sportsmanship have set them apart from the competition. The player is expected to play a pivotal role in the upcoming matches, and fans are eager to see how they continue their form.",
      date: "October 10, 2024",
      author: "Arun",
      image:
        "https://media.crictracker.com/media/attachments/1718278459668_Team-India.jpeg",
      slug: "player-of-the-month-october-2024",
    },
    {
      id: 13,
      title: "Team K Dominates in the Finals",
      content:
        "Team K’s dominant performance in the finals left little doubt about their superiority. From the opening overs, they took control of the game with aggressive batting and disciplined bowling. Their star players rose to the occasion, delivering a memorable victory that will be talked about for years to come. Team K’s tactical decisions on the field played a crucial role in their success, and their fans couldn’t have asked for a better finale.",
      date: "October 9, 2024",
      author: "Arun",
      image:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_960,q_50/lsci/db/PICTURES/CMS/336500/336568.6.jpg",
      slug: "team-k-dominates-finals",
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByAuthor, setFilterByAuthor] = useState("");

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
  };

  const handleFilterByAuthor = (event) => {
    setFilterByAuthor(event.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm);
    const matchesAuthor = filterByAuthor
      ? post.author.toLowerCase().includes(filterByAuthor)
      : true;
    return matchesSearch && matchesAuthor;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Blog Posts</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search posts..."
          className="input input-bordered w-full md:w-1/2 border-0 rounded-xl shadow-xl"
          value={searchTerm}
          onChange={handleSearch}
        />
        <input
          type="text"
          placeholder="Search auther..."
          className="input input-bordered w-full md:w-1/4 border-0 rounded-xl shadow-xl"
          value={filterByAuthor}
          onChange={handleFilterByAuthor}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover mb-2"
              />
              <h2 className="text-lg sm:text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 text-sm">
                {post.date} • {post.author}
              </p>
              <p className="text-gray-700">{post.content.slice(0, 47)}...</p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
