import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

import * as styles from "./section.module.css"
import Video from "./video"

const Section = ({ children, image }) => {
  const hasVideo = image && !image.fluid

  return (
    <section className={styles.wrapper}>
      {image && (
        <div className={hasVideo ? styles.video : styles.image}>
          {hasVideo ? (
            <Video src={`https:${image.file.url}`} />
          ) : (
            <GatsbyImage image={image.gatsbyImageData} alt={image.title} />
          )}
        </div>
      )}
      {children}
    </section>
  )
}

export default Section
