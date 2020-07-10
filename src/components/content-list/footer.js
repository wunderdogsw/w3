import React from "react"

import styles from "./footer.module.css"

const Footer = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
)

export default Footer
