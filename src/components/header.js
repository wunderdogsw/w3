import React from "react"
import Image from "gatsby-image"

import styles from "./header.module.css"

const Header = ({ title, subtitle, image }) => (
  <header className={styles.wrapper}>
    <div className={styles.content}>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div
        dangerouslySetInnerHTML={{ __html: subtitle }}
        className={styles.subtitle}
      />
    </div>
    {image && (
      <div className={styles.image}>
        <Image fluid={image.fluid} />
      </div>
    )}
  </header>
)

export default Header
