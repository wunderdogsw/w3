import React from "react"
import Link from "../components/link"
import * as styles from "./hyperlink-button-block.module.css"

const HyperlinkButtonBlock = ({ data }) => (
  <div className={`${styles.wrapper} ${styles[data.align]}`}>
    <Link to={data.embeddedLink}>{data.textContent}</Link>
  </div>
)

export default HyperlinkButtonBlock
