import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import GameTrackerWrapper from "../components/GameTrackerWrapper"
import Dropdown from "../components/Dropdown"
import Scoreboard from "../components/Scoreboard"

import styled from "styled-components"

const GameContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function GameContainer() {
  const [gameData, setGameData] = useState([])
  const [selected, setSelected] = useState("44094-ATL@NYM-1")
  const [selectedGame, setSelectedGame] = useState([])
  const [selectedAtbat, setSelectedAtbat] = useState({})

  const data = useStaticQuery(graphql`
    query mlbData {
      allMongodbMlbMongoDbGames {
        edges {
          node {
            id
            date
            balls
            batter
            batterHand
            dataset
            description
            endingRE
            gameId
            hitTypes
            homeScore
            homeTeam
            homeTeamWinPct
            inning
            mongodb_id
            outs
            pitcher
            pitcherHand
            playTypes
            roadScore
            roadTeam
            runnerOn1bInd
            runnerOn2bInd
            runnerOn3bInd
            runs
            startOuts
            startingRE
            strikes
          }
        }
        distinct(field: gameId)
      }
    }
  `)

  useEffect(() => {
    setGameData(data.allMongodbMlbMongoDbGames.edges)
    console.log(data.allMongodbMlbMongoDbGames.edges)

    let singleGame

    if (!selected) {
      singleGame = data.allMongodbMlbMongoDbGames.edges.filter(
        g => g.node.gameId === "44094-ATL@NYM-1"
      )
    } else {
      singleGame = data.allMongodbMlbMongoDbGames.edges.filter(
        g => g.node.gameId === selected
      )
    }

    setSelectedGame(singleGame)
    console.log(singleGame)
  }, [gameData, selected])

  return (
    <GameContainerDiv>
      <Dropdown
        games={data.allMongodbMlbMongoDbGames.distinct}
        setSelected={setSelected}
        selected={selected}
      />
      {selectedGame.length > 0 && (
        <>
          <Scoreboard gameData={selectedGame} />
          <GameTrackerWrapper
            gameData={selectedGame}
            setSelectedAtbat={setSelectedAtbat}
            selectedAtbat={selectedAtbat}
          />
        </>
      )}
    </GameContainerDiv>
  )
}
