import React from "react"

import styled from "styled-components"

import ScoreboardBox from "./ScoreboardBox"
import processScoreboardData from "../utils/processGameDataForScoreboard"

export default function Scoreboard({ gameData }) {
  const processedGameData = processScoreboardData(gameData)
  const homeTeam = gameData[0].node.homeTeam
  const roadTeam = gameData[0].node.roadTeam

  // console.log(homeTeam)
  // console.log(roadTeam)

  // console.log(Object.keys(processedGameData).length)
  // console.log(processedGameData)

  const ScoreboardDiv = styled.div`
    width: 95%;
    max-width: 800px;
    border: solid rgb(247, 252, 242) 3px;
    padding: 10px;
    margin-bottom: 20px;
    display: grid;
    background-color: rgb(47, 77, 50);
    grid: 30px 50px 50px / 2fr repeat(${props => props.innings}, 1fr);
  `

  const innings = Math.ceil(Object.keys(processedGameData).length / 2)

  return (
    <ScoreboardDiv innings={innings}>
      <ScoreboardBox value={" "} boxShadow={"none"} />
      {[...Array(innings).keys()].map(inning => (
        <ScoreboardBox key={inning} value={inning + 1} />
      ))}
      <ScoreboardBox value={roadTeam} inning={"top"} />
      <ScoreboardBox value={homeTeam} inning={"bottom"} />
      {Object.keys(processedGameData).map(inningKey => (
        <ScoreboardBox
          key={inningKey}
          value={processedGameData[inningKey]}
          inning={inningKey[inningKey.length - 1] === "T" ? "top" : "bottom"}
          fontSize={"36px"}
        />
      ))}
    </ScoreboardDiv>
  )
}
