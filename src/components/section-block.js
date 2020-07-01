import React from "react"
import Image from "gatsby-image"

import styles from "./section-block.module.css"
import RichText from "./rich-text"

const renderImage = image => (
  <div className={styles.image}>
    <Image fluid={image.fluid} />
  </div>
)

const SectionBlock = ({ data }) => (
  <section className={styles.wrapper}>
    {data.image && renderImage(data.image)}
    <div className={styles.content}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <RichText document={data.content.json} />
    </div>
  </section>
)

export default SectionBlock
