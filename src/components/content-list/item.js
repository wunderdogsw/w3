import React from "react"
import { Link } from "gatsby"

import styles from "./item.module.css"

const Item = ({ to, title, subtitle, link, image }) => (
  <Link to={to} className={styles.wrapper}>
    <div className={styles.image}>
      <div className={styles.front}>{link}</div>
      {image}
    </div>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.subtitle}>{subtitle}</div>
  </Link>
)

export default Item
