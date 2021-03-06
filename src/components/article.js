import React from "react"

import * as styles from "./article.module.css"

const Article = ({ children }) => (
  <article className={styles.wrapper}>{children}</article>
)

export default Article
