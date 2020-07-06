import React from "react"
import Image from "gatsby-image"

import styles from "./header.module.css"
import Video from "./video"

const Header = ({ title, subtitle, image }) => {
  const hasVideo = image && !image.fluid

  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <div
          dangerouslySetInnerHTML={{ __html: subtitle }}
          className={styles.subtitle}
        />
      </div>
      {image && (
        <div className={hasVideo ? styles.video : styles.image}>
          {hasVideo ? (
            <Video src={`https:${image.file.url}`} />
          ) : (
            <Image fluid={image.fluid} />
          )}
        </div>
      )}
    </header>
  )
}

export default Header
