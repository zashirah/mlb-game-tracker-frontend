import React, { useState } from "react"

export default function Dropdown({ games, setSelected, selected }) {
  return (
    <form onChange={(e) => {
      e.preventDefault()
      setSelected(e.target.value)
    }}>
      <select>
        <option>- Select a Game -</option>
        {games.map(game => (
          <option
            key={game}
            value={game}
          >
            {game}
          </option>
        ))}
      </select>
    </form>
  )
}
