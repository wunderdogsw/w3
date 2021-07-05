import React from "react"

import * as styles from "./footer.module.css"

const Footer = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
)

export default Footer
