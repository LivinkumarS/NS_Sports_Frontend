import { HR } from "flowbite-react";
import React, { useState } from "react";

export default function ScoreCard({ team, mathDetail }) {
  const [activeTab, setActiveTab] = useState("scorecard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="w-full">
        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 py-2 text-center text-sm sm:text-md  font-semibold ${
              activeTab === "scorecard"
                ? "text-[#0077b6] border-b-2 border-[#0077b6]"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("scorecard")}
          >
            {mathDetail.data.status === "completed"
              ? "Scorecard"
              : "Player List"}
          </button>
          <button
            className={`flex-1 py-2 text-center text-sm sm:text-md  font-semibold ${
              activeTab === "playingXI"
                ? "text-[#0077b6] border-b-2 border-[#0077b6]"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("playingXI")}
          >
            Playing XI
          </button>
        </div>
        <div className="mt-2 overflow-x-scroll sm:overflow-x-hidden">
          {activeTab === "scorecard" ? (
            mathDetail.data.play ? (
              <>
                <h3 className="font-semibold text-center text-[#0077b6] my-2">
                  Batting Order
                </h3>
                <table className="min-w-full border border-blue-300">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-left w-1/3">
                        Name
                      </th>
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-center">
                        Runs
                      </th>
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-center">
                        Balls
                      </th>
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-center">
                        6s
                      </th>
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-center">
                        4s
                      </th>
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-center">
                        S/R
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mathDetail.data.play.innings[
                      `${team}_1`
                    ].batting_order.map((batsman, ind) => (
                      <tr key={ind}>
                        <td className="whitespace-nowrap px-4 py-2 border-b border-gray-300 font-semibold text-xs sm:text-md">
                          {mathDetail.data.players[batsman].player.name}{" "}
                          {mathDetail.data.players[batsman].score[`${1}`]
                            .batting.dismissal ? (
                            <span className="text-gray-600">
                              (
                              {
                                mathDetail.data.players[batsman].score[`${1}`]
                                  .batting.dismissal.msg
                              }
                              )
                            </span>
                          ) : (
                            <span className="text-gray-600">(notout)</span>
                          )}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-md">
                          {
                            mathDetail.data.players[batsman].score[`${1}`]
                              .batting.score.runs
                          }
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-md">
                          {
                            mathDetail.data.players[batsman].score[`${1}`]
                              .batting.score.balls
                          }
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-md">
                          {
                            mathDetail.data.players[batsman].score[`${1}`]
                              .batting.score.sixes
                          }
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-md">
                          {
                            mathDetail.data.players[batsman].score[`${1}`]
                              .batting.score.fours
                          }
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-md">
                          {
                            mathDetail.data.players[batsman].score[`${1}`]
                              .batting.score.strike_rate
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 className="font-semibold text-center text-[#0077b6] my-2">
                  Bowling Order
                </h3>
                <table className="min-w-full border border-blue-300">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-left w-1/3">
                        Name
                      </th>
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-center">
                        Balls
                      </th>
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-center">
                        Runs
                      </th>
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-center">
                        Wickets
                      </th>
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-center">
                        Eco
                      </th>
                      <th className="px-4 py-2 border-b text-sm sm:text-md border-gray-300 text-center">
                        Extras
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mathDetail.data.play.innings[
                      `${team}_1`
                    ].bowling_order.map((batsman, ind) => (
                      <tr key={ind}>
                        <td className="whitespace-nowrap px-4 py-2 border-b border-gray-300 font-semibold text-xs sm:text-md">
                          {mathDetail.data.players[batsman].player.name}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-md">
                          {
                            mathDetail.data.players[batsman].score[`${1}`]
                              .bowling.score.balls
                          }
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-md">
                          {
                            mathDetail.data.players[batsman].score[`${1}`]
                              .bowling.score.runs
                          }
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-md">
                          {
                            mathDetail.data.players[batsman].score[`${1}`]
                              .bowling.score.wickets
                          }
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-md">
                          {
                            mathDetail.data.players[batsman].score[`${1}`]
                              .bowling.score.economy
                          }
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-md">
                          {
                            mathDetail.data.players[batsman].score[`${1}`]
                              .bowling.score.extras
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <table className="min-w-full border border-blue-300">
                <thead>
                  <tr className="bg-blue-200">
                    <th className="border-b text-sm sm:text-md text-left px-4 py-2 w-1/2">
                      Name
                    </th>
                    <th className="border-b text-sm sm:text-md text-left px-4 py-2 w-1/6">
                      Role
                    </th>
                    <th className="border-b text-sm sm:text-md text-left px-4 py-2 w-1/6">
                      Batting Style
                    </th>
                    <th className="border-b text-sm sm:text-md text-left px-4 py-2 w-1/6">
                      Bowling Style
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mathDetail.data.squad[team].player_keys.map(
                    (player, ind) => (
                      <tr key={ind}>
                        <td className="border-b px-4 py-2 text-xs sm:text-md">
                          {mathDetail.data.players[player].player.name}
                        </td>
                        <td className="border-b px-4 py-2 text-xs sm:text-md">
                          {mathDetail.data.players[
                            player
                          ].player.seasonal_role.replace("_", " ")}
                        </td>
                        <td className="border-b px-4 py-2 text-xs sm:text-md">
                          {mathDetail.data.players[
                            player
                          ].player.batting_style.replace("_", " ")}
                        </td>
                        <td className="border-b px-4 py-2 text-xs sm:text-md">
                          {mathDetail.data.players[player].player.bowling_style
                            ? mathDetail.data.players[player].player
                                .bowling_style.arm
                              ? mathDetail.data.players[
                                  player
                                ].player.bowling_style.arm.replace("_", " ")
                              : null
                            : "-"}{" "}
                          {mathDetail.data.players[player].player.bowling_style
                            ? mathDetail.data.players[player].player
                                .bowling_style.pace
                              ? mathDetail.data.players[
                                  player
                                ].player.bowling_style.pace.replace("_", " ")
                              : null
                            : "-"}{" "}
                          {mathDetail.data.players[player].player.bowling_style
                            ? mathDetail.data.players[player].player
                                .bowling_style.bowling_type
                              ? mathDetail.data.players[
                                  player
                                ].player.bowling_style.bowling_type.replace(
                                  "_",
                                  " "
                                )
                              : null
                            : "-"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )
          ) : mathDetail.data.squad[team].playing_xi.length > 0 ? (
            <table className="min-w-full border border-blue-300">
              <thead>
                <tr className="bg-blue-200">
                  <th className="border-b text-sm sm:text-md text-left px-4 py-2 w-1/2">
                    Name
                  </th>
                  <th className="border-b text-sm sm:text-md text-left px-4 py-2 w-1/6">
                    Role
                  </th>
                  <th className="border-b text-sm sm:text-md text-left px-4 py-2 w-1/6">
                    Batting Style
                  </th>
                  <th className="border-b text-sm sm:text-md text-left px-4 py-2 w-1/6">
                    Bowling Style
                  </th>
                </tr>
              </thead>
              <tbody>
                {mathDetail.data.squad[team].playing_xi.map((player, ind) => (
                  <tr key={ind}>
                    <td className="border-b px-4 py-2 text-xs sm:text-md">
                      {mathDetail.data.players[player].player.name}
                    </td>
                    <td className="border-b px-4 py-2 text-xs sm:text-md">
                      {mathDetail.data.players[
                        player
                      ].player.seasonal_role.replace("_", " ")}
                    </td>
                    <td className="border-b px-4 py-2 text-xs sm:text-md">
                      {mathDetail.data.players[
                        player
                      ].player.batting_style.replace("_", " ")}
                    </td>
                    <td className="border-b px-4 py-2 text-xs sm:text-md">
                      {mathDetail.data.players[player].player.bowling_style
                        ? mathDetail.data.players[player].player.bowling_style
                            .arm
                          ? mathDetail.data.players[
                              player
                            ].player.bowling_style.arm.replace("_", " ")
                          : null
                        : "-"}{" "}
                      {mathDetail.data.players[player].player.bowling_style
                        ? mathDetail.data.players[player].player.bowling_style
                            .pace
                          ? mathDetail.data.players[
                              player
                            ].player.bowling_style.pace.replace("_", " ")
                          : null
                        : "-"}{" "}
                      {mathDetail.data.players[player].player.bowling_style
                        ? mathDetail.data.players[player].player.bowling_style
                            .bowling_type
                          ? mathDetail.data.players[
                              player
                            ].player.bowling_style.bowling_type.replace(
                              "_",
                              " "
                            )
                          : null
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 className="text-center p-4">Not Yet Released!</h1>
          )}
        </div>
        {mathDetail.data.status === "completed" && (
          <div className="flex mt-2 flex-wrap w-full p-2 gap-2 items-center justify-around">
            <p className="font-semibold">
              <span className="text-[#0077b6] font-bold">Totlal: </span>
              {mathDetail.data.play.innings[`${team}_1`].score.runs}
            </p>
            <p className="font-semibold">
              <span className="text-[#0077b6] font-bold">Run rate: </span>
              {mathDetail.data.play.innings[`${team}_1`].score.run_rate}
            </p>
            <p className="font-semibold">
              <span className="text-[#0077b6] font-bold">Fours: </span>
              {mathDetail.data.play.innings[`${team}_1`].score.fours}
            </p>
            <p className="font-semibold">
              <span className="text-[#0077b6] font-bold">Sixes: </span>
              {mathDetail.data.play.innings[`${team}_1`].score.sixes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
