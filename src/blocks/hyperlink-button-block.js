import React from "react"
import Link from "../components/link"
import styles from "./hyperlink-button-block.module.css"

const HyperlinkButtonBlock = ({ data }) => {
  return (
    <div className={`${styles.wrapper} ${styles[data.align]}`}>
      <Link to={data.embeddedLink}>{data.textContent}</Link>
    </div>
  )
}

export default HyperlinkButtonBlock
