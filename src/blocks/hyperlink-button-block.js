import React from "react"
import styles from "./hyperlink-button-block.module.css"
import { Link } from "gatsby"
const HyperlinkButtonBlock = ({ data }) => {
  return (
    <div className={`${styles.wrapper} ${styles[data.align]}`}>
      <Link to={`/${data.embeddedLink}`}>{data.textContent}</Link>
    </div>
  )
}

export default HyperlinkButtonBlock
