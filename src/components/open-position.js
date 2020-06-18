import React from "react"

const OpenPosition = ({ title, office, link }) => (
  <a href={link}>
    <span>{title}</span>
    <span>{office}</span>
  </a>
)

export default OpenPosition
