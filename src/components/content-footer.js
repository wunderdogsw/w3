import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"

import * as styles from "./content-footer.module.css"
import Legal from "./legal"

const ContentFooter = ({ title, subtitle, image, to }) => (
  <div className={styles.wrapperOuter}>
    <div className={styles.wrapperInner}>
      <div className={styles.backdrop}>
        <Image
          className={styles.img}
          fluid={image.fluid}
          alt={image.title || title}
        />
      </div>
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
