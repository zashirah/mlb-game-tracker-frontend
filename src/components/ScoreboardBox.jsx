import React from "react"

import styled from "styled-components"


const ScoreboardBoxDiv = styled.div`
  /* border: solid black 1px; */
  box-shadow: ${props => props.boxShadow || `inset 3px 2px 10px -5px black`};
  margin: 2px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.fontSize || "18px"};
  background-color: rgb(47, 77, 50);
  color: rgb(247, 252, 242);
  line-height: 1.1;
  grid-row: ${props =>
    props.inning === "top" ? 2 : props.inning === "bottom" ? 3 : 1};
  @media (max-width: 800px) {
    font-size: 14px;
  }
`

export default function ScoreboardBox({ value, inning, fontSize, boxShadow }) {
  return (
    <ScoreboardBoxDiv inning={inning} fontSize={fontSize} boxShadow={boxShadow}>
      {value}
    </ScoreboardBoxDiv>
  )
}
