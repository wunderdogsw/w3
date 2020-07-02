import React from "react"
import Image from "gatsby-image"

import styles from "./section-block.module.css"
import Section from "./section"
import RichText from "./rich-text"

const SectionBlock = ({ data }) => (
  <Section image={data.image}>
    <div className={styles.content}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <RichText document={data.content.json} />
    </div>
  </Section>
)

export default SectionBlock
