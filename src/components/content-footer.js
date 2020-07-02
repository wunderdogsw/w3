import React from "react"
import { Link } from "gatsby"

import styles from "./content-footer.module.css"
import Legal from "./legal"

const ContentFooter = ({ title, subtitle, image, to }) => (
  <div className={styles.wrapperOuter}>
    <div className={styles.wrapperInner}>
      <div
        className={styles.backdrop}
        style={{ backgroundImage: `url(https:${image})` }}
      />
      <div className={styles.content}>
        <Link to={to} className={styles.link}>
          <div>{subtitle}</div>
          <h1>{title}</h1>
        </Link>
        <Legal />
      </div>
    </div>
  </div>
)

export default ContentFooter
