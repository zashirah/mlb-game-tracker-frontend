import * as d3 from "d3"

const data = [41, 21, 45, 76, 32]

const url = "https://udemy-react-d3.firebaseio.com/ages.json"

export default class D3Chart {
  constructor(element, gameData) {
    // console.log(gameData)
    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", '80vw')
      .attr("height", 500)

    // svg.append("rect")
    //   .attr("x", 50)
    //   .attr("y", 50)
    //   .attr("width", 100)
    //   .attr("height", 400)
    //   .attr("fill", "grey");

    // d3.json(url).then(agesData => {
      // console.log(gameData)

      const rects = svg.selectAll("rect").data(gameData)

      rects
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 100)
        .attr("y", 50)
        .attr("width", 50)
        .attr("height", (d, i) => d.node.homeTeamWinPct * 100)
        .attr("fill", d => {
          if (d.name === "Tony") {
            return "red"
          }
          return "green"
        })
    // })
  }

  update() {}
}
