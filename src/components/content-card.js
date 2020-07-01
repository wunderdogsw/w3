import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"

import styles from "./content-card.module.css"

const ContentCard = ({ to, title, subtitle, image }) => (
  <Link to={to} className={styles.wrapper}>
    <div className={styles.image}>
      <Image fluid={image.fluid} />
    </div>
    <h4 className={styles.title}>{title}</h4>
    <div className={styles.subtitle}>{subtitle}</div>
  </Link>
)

export default ContentCard
