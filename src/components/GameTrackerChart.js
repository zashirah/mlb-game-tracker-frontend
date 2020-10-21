import * as d3 from "d3"

const MARGIN = { TOP: 60, BOTTOM: 50, LEFT: 70, RIGHT: 10 }
// const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

export default class D3Chart {
  constructor(element, gameData, screenWidth) {
    let vis = this
  
    vis.WIDTH = screenWidth - MARGIN.LEFT - MARGIN.RIGHT

    // create svg canvas
    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", vis.WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    // create y axis
    vis.y = d3.scaleLinear().domain([0, 1]).range([0, HEIGHT])

    // append y axis
    // vis.svg.append("g").attr("class", "y axis").call(d3.axisLeft(vis.y))

    // y axis
    vis.svg
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .text("Home Team Win Probability")
      .attr("transform", "rotate(-90)")
      .attr("fill", "white")
      .attr("font-size", "12px")

    vis.yAxisGroup = vis.svg.append("g")

    const yAxisCall = d3
      .axisLeft(vis.y)
      .tickValues([0.25, 0.5, 0.75])
      .tickFormat(d => d * 100 + "%")
    
    vis.yAxisGroup.call(yAxisCall)

    // create x axis group
    vis.xAxisGroup = vis.svg.append("g")

    // title
    vis.svg
      .append("text")
      .attr("x", vis.WIDTH / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .text("Home Team Win Percent by Game State")
      .attr("fill", "white")
      .attr("font-size", "12px")
    
    vis.svg
      .append("text")
      .attr("x", vis.WIDTH / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .text("Data Sourced from bigdataball.com")
      .attr("fill", "white")
      .attr("font-size", "8px")

    vis.svg
      .append("text")
      .attr("x", vis.WIDTH / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .text(
        "Used 2016 regular and post season data to calculate Win % by game state"
      )
      .attr("fill", "white")
      .attr("font-size", "8px")


    // call update()
    vis.update(gameData)
  }

  update(data) {
    const vis = this

    // create x axis
    const x = d3.scaleLinear().domain([0, data.length]).range([0, vis.WIDTH])

    // append x axis
    const xAxisCall = d3.axisBottom(x)
    vis.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall)
      .attr("transform", `translate(0, ${HEIGHT})`)
      .attr("fill", "none")
      .transition()
      .duration(500)

    // 50% line
    vis.svg
      .append("path")
      .datum([...Array(data.length).keys()])
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 0.75)
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

    // 25% line
    vis.svg
      .append("path")
      .datum([...Array(data.length).keys()])
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 0.25)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d)
          })
          .y(function (d) {
            return vis.y(0.25)
          })
    )
    
    // 75% line
    vis.svg
      .append("path")
      .datum([...Array(data.length).keys()])
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 0.25)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d)
          })
          .y(function (d) {
            return vis.y(0.75)
          })
    )
    
    // UPDATE THE LINES
    // DATA JOIN
    const lines = vis.svg.selectAll(".pathLine").data(data)

    // can't get lines to update properly. This is the article I followed: https://www.d3-graph-gallery.com/graph/line_change_data.html
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
      .attr("stroke", "white")
      .attr("stroke-width", 2.5)
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
      .attr("fill", "white")
  }
}
