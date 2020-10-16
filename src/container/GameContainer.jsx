import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function GameContainer() {
  const data = useStaticQuery(graphql`
    query mlbData {
      allMongodbMlbMongoDbGames(filter: {gameId: {eq: "44094-ATL@NYM-1"}}) {
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
      }
    }
  `)

  console.log(data.allMongodbMlbMongoDbGames.edges)

  return <div>hi</div>
}

