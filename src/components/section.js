import React from "react"
import Image from "gatsby-image"

import styles from "./section.module.css"
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
            <Image fluid={image.fluid} />
          )}
        </div>
      )}
      {children}
    </section>
  )
}

export default Section
