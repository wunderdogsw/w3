import React from "react"

import styles from "./toggle.module.css"

const Toggle = ({ onClick, active }) => (
  <button
    onClick={onClick}
    className={`${styles.wrapper} ${active ? styles.active : ""}`}
  >
    <span />
    <span />
    <span />
  </button>
)

export default Toggle
