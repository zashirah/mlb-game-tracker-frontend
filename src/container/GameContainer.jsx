import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import GameTrackerWrapper from "../components/GameTrackerWrapper"
import Dropdown from "../components/Dropdown"

export default function GameContainer() {
  const [gameData, setGameData] = useState([])
  const [selected, setSelected] = useState('44094-ATL@NYM-1')
  const [selectedGame, setSelectedGame] = useState([])

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

  // console.log(data.allMongodbMlbMongoDbGames.distinct)
  // console.log(data.allMongodbMlbMongoDbGames.edges)

  useEffect(() => {
    setGameData(data.allMongodbMlbMongoDbGames.edges)
    // console.log("test", gameData)

    let singleGame

    if (!selected) {
      // console.log("hi") 
      singleGame = data.allMongodbMlbMongoDbGames.edges.filter(
        g => g.node.gameId === "44094-ATL@NYM-1"
      )
    } else {
      // console.log("hi2")
      singleGame = data.allMongodbMlbMongoDbGames.edges.filter(
        g => g.node.gameId === selected
      )
    }

    // console.log("singlegame", singleGame)
    setSelectedGame(singleGame)
    // console.log("test2", selectedGame)

  console.log('running')


  }, [gameData, selected])

  console.log(selected)
  console.log(selectedGame)

  return (
    <>
      <Dropdown
        games={data.allMongodbMlbMongoDbGames.distinct}
        setSelected={setSelected}
        selected={selected}
      />
      {selectedGame.length > 0 && 
        <GameTrackerWrapper gameData={selectedGame} />
      }
    </>
  )
}
