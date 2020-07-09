import React from "react"

import styles from "./section-block.module.css"
import Section from "../components/section"
import RichText from "../components/rich-text"
import Jump from "../components/jump"

const renderSection = data => (
  <Section image={data.image}>
    <div className={styles.content}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <RichText document={data.content.json} />
    </div>
  </Section>
)

const SectionBlock = ({ data }) => {
  if (data.animated) {
    return <Jump>{renderSection(data)}</Jump>
  }

  return renderSection(data)
}

export default SectionBlock
