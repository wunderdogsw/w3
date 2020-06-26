import React from "react"

import styles from "./footer.module.css"

const Footer = ({ children }) => (
  <footer className={styles.wrapper}>{children}</footer>
)

export default Footer
