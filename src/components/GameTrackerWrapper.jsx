import React, { useRef, useState, useEffect } from "react"
import GameTrackerChart from "./GameTrackerChart"

const ChartWrapper = ({ gameData, selectedAtbat, setSelectedAtbat }) => {
  const chartArea = useRef(null)
  const [chart, setChart] = useState(null)

  const screenWidth = window.innerWidth * 0.95

  const handleDotClick = id => {
    const selected = gameData.find(game =>
      game.node.id === id
    )
    setSelectedAtbat(selected.node)
  }

  useEffect(() => {
    if (!chart) {
      setChart(
        new GameTrackerChart(
          chartArea.current,
          gameData,
          screenWidth,
          handleDotClick
        )
      )
    } else {
      chart.update(gameData)
    }
  }, [chart, gameData])

  useEffect(() => {
    chart && chart.updateSelectedDot(gameData, selectedAtbat)
  }, [selectedAtbat])

  return <div className="chart-area" ref={chartArea}></div>
}

export default ChartWrapper
