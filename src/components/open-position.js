import React from "react"

import styles from "./open-position.module.css"
import SecondaryText from "./secondary-text"

const OpenPosition = ({ title, office, link }) => (
  <a className={styles.wrapper} href={link}>
    <span>{title}</span>
    <SecondaryText>{office}</SecondaryText>
  </a>
)

export default OpenPosition
