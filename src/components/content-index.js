import React from "react"

import * as styles from "./content-index.module.css"

const ContentIndex = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
)

export default ContentIndex
