import React from "react"

export default function ScoreboardBox({ value }) {
  return (
    <div
      style={{
        height: "45%",
        border: "solid gray 1px",
        margin: "2px",
        padding: "2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
      }}
    >
      {value}
    </div>
  )
}
