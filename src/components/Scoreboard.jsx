import React from "react"
import ScoreboardBox from "./ScoreboardBox"
import processScoreboardData from "../utils/processGameDataForScoreboard"

export default function Scoreboard({ gameData }) {
  const processedGameData = processScoreboardData(gameData)
  const homeTeam = gameData[0].node.homeTeam
  const roadTeam = gameData[0].node.roadTeam

  console.log(homeTeam)
  console.log(roadTeam)

  console.log(Object.keys(processedGameData).length)

  return (
    <div
      style={{
        height: "200px",
        width: "1000px",
        border: "solid gray 1px",
        padding: "10px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: 'center',
        
      }}
    >
      <ScoreboardBox value={roadTeam} />
      <ScoreboardBox value={homeTeam} />
      {Object.keys(processedGameData).map(inning => (
        <ScoreboardBox key={inning} value={processedGameData[inning]} />
      ))}
    </div>
  )
}
