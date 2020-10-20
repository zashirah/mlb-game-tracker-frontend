export default function processScoreboardData(gameData) {
  
  const scoreboard = {}

  for (let elem of gameData) {

    (scoreboard[elem.node.inning]) ?
      scoreboard[elem.node.inning] += elem.node.runs :
      scoreboard[elem.node.inning] = elem.node.runs
      

  }

  return scoreboard
}