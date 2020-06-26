import React from "react"
import { Link } from "gatsby"

import Footer from "./footer"
import Legal from "./legal"
import styles from "./content-footer.module.css"

const ContentFooter = ({ title, subtitle, image, to }) => (
  <Footer>
    <div className={styles.wrapper}>
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
  </Footer>
)

export default ContentFooter
