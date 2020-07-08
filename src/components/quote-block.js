import React from "react"

import styles from "./quote-block.module.css"

const QuoteBlock = ({ data }) => (
  <blockquote className={styles.wrapper}>
    <p>{data.content.content}</p>
    {data.author && <footer>{data.author}</footer>}
  </blockquote>
)

export default QuoteBlock
