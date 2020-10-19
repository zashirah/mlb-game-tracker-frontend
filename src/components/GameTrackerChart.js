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
    // vis.x = d3.scaleLinear().domain([0, gameData.length]).range([0, WIDTH])

    // append y axis
    vis.svg.append("g").attr("class", "y axis").call(d3.axisLeft(vis.y))

    // create x axis group
    vis.xAxisGroup = vis.svg.append("g")

    // call update()
    vis.update(gameData)
  }

  update(data) {
    const vis = this

    // create x axis
    const x = d3.scaleLinear().domain([0, data.length]).range([0, WIDTH])

    // append x axis
    const xAxisCall = d3.axisBottom(x)
    vis.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall)
      .attr("transform", `translate(0, ${HEIGHT})`)
      .transition()
      .duration(500)

    // 50% line
    vis.svg
      .append("path")
      .datum([...Array(data.length).keys()])
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d)
          })
          .y(function (d) {
            return vis.y(0.5)
          })
      )

    // UPDATE THE LINES
    // DATA JOIN
    const lines = vis.svg.selectAll(".pathLine").data(data)

    console.log("lines", lines)

    // lines
    //   .enter()
    //   .append("path")
    //   .attr("class", "pathLine")
    //   .merge(lines)
    //   .transition()
    //   .duration(500)
    //   .attr(
    //     "d",
    //     d3
    //       .line()
    //       .x((d, i) => x(i))
    //       .y(d => vis.y(1 - d.node.homeTeamWinPct))
    //   )
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-width", 1.5)

    // EXIT
    lines
      .exit()
      .transition()
      .duration(500)
      .attr("height", 0)
      .attr("y", HEIGHT)
      .remove()

    // UPDATE
    lines
      .transition()
      .duration(500)
      .attr(
        "d",
        d3
          .line()
          .x((d, i) => x(i))
          .y(d => vis.y(1 - d.node.homeTeamWinPct))
      )

    // append path, bind data, call generator
    vis.svg
      .datum(data)
      .append("path")
      .transition()
      .duration(500)
      .attr("class", "pathLine")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d, i) => x(i))
          .y(d => vis.y(1 - d.node.homeTeamWinPct))
      )

    // UPDATE THE DOTS
    // DATA JOIN
    const dots = vis.svg.selectAll(".dot").data(data)

    // EXIT
    dots
      .exit()
      .transition()
      .duration(500)
      .attr("height", 0)
      .attr("y", HEIGHT)
      .remove()

    // UPDATE
    dots
      .transition()
      .duration(500)
      .attr("cx", (d, i) => x(i))
      .attr("cy", d => vis.y(1 - d.node.homeTeamWinPct))
      .attr("r", 3)

    // select dots class, bind data, appendcircles
    dots
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d, i) => x(i))
      .attr("cy", d => vis.y(1 - d.node.homeTeamWinPct))
      .attr("r", 3)
      .attr("fill", "steelblue")
  }
}
