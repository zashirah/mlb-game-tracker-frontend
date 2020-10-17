import * as d3 from "d3"

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 }
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM

export default class D3Chart {
  constructor(element, gameData) {
    let vis = this

    // create svg canvas
    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

    // create y axis
    vis.y = d3.scaleLinear().domain([0, 1]).range([0, HEIGHT])

    // create x axis
    vis.x = d3.scaleLinear().domain([0, gameData.length]).range([0, WIDTH])

    // append y axis
    vis.svg.append("g").attr("class", "y axis").call(d3.axisLeft(vis.y))

    // append x axis
    vis.svg
      .append("g")
      .attr("class", "x axis")
      .call(d3.axisBottom(vis.x))
      .attr("transform", `translate(0, ${HEIGHT})`)

    // 50% line
    vis.svg
      .append("path")
      .datum([...Array(gameData.length).keys()])
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return vis.x(d)
          })
          .y(function (d) {
            return vis.y(0.5)
          })
      )

    // append path, bind data, call generator
    vis.svg
      .append("path")
      .datum(gameData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d, i) {
            return vis.x(i)
          })
          .y(function (d) {
            return vis.y(1 - d.node.homeTeamWinPct)
          })
      )

    // select dots class, bind data, appendcircles
    vis.svg
      .selectAll(".dot")
      .data(gameData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", function (d, i) {
        return vis.x(i)
      })
      .attr("cy", function (d) {
        return vis.y(1 - d.node.homeTeamWinPct)
      })
      .attr("r", 3)
      .attr("fill", "steelblue")
  }

  update() {}
}
