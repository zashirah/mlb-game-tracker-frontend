import React, { useState } from "react"

export default function Dropdown({ games, setSelected }) {
  return (
    <form>
      <input type="select" placeholder="Search for a Game"></input>

      <button>Submit</button>
      <div
        // style={{
        //   height: "200px",
        // }}
      >
        {games.map(game => (
          <button key={game} onClick={(e) => {
            e.preventDefault()
            setSelected(game)
          }}>
            {game}
          </button>
        ))}
      </div>
    </form>
  )
}
