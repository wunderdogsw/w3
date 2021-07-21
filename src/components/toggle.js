import React from "react"

import * as styles from "./toggle.module.css"
import PlainButton from "./plain-button"

const Toggle = ({ className, onClick, active }) => (
  <div
    className={`${className} ${styles.wrapper} ${active ? styles.active : ""}`}
  >
    <PlainButton
      onClick={onClick}
      className={`${styles.innerWrapper} ${active ? styles.active : ""}`}
    >
      <span />
      <span />
      <span />
    </PlainButton>
  </div>
)

export default Toggle
