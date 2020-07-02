import React from "react"

import styles from "./content-list-footer.module.css"

const ContentListFooter = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
)

export default ContentListFooter
