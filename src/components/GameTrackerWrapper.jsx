import React, { useRef, useState, useEffect } from "react"
import GameTrackerChart from "./GameTrackerChart"

const ChartWrapper = ({ gameData }) => {
  const chartArea = useRef(null)
  const [chart, setChart] = useState(null)

  useEffect(() => {
    if (!chart) {
      setChart(new GameTrackerChart(chartArea.current, gameData))
    } else {
      chart.update(gameData)
    }
  }, [chart, gameData])

  return <div className="chart-area" ref={chartArea}></div>
}

export default ChartWrapper
