import React from "react"

import styles from "./secondary-text.module.css"

const SecondaryText = ({ children }) => (
  <span className={styles.wrapper}>{children}</span>
)

export default SecondaryText
