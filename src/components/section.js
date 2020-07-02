import React from "react"
import Image from "gatsby-image"

import styles from "./section.module.css"

const Section = ({ children, image }) => (
  <section className={styles.wrapper}>
    {image && (
      <div className={styles.image}>
        <Image fluid={image.fluid} />
      </div>
    )}
    {children}
  </section>
)

export default Section
