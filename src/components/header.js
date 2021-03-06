import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

import Video from "./video"
import * as styles from "./header.module.css"

const renderSubtitle = subtitle => {
  const className = styles.subtitle

  if (typeof subtitle === "string") {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: subtitle }}
        className={className}
      />
    )
  }

  return <div className={className}>{subtitle}</div>
}

const Header = ({ title, subtitle, image }) => {
  const hasVideo = image && !image.gatsbyImageData

  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {renderSubtitle(subtitle)}
      </div>
      {image && (
        <div className={hasVideo ? styles.video : styles.image}>
          {hasVideo ? (
            <Video src={`https:${image.file.url}`} />
          ) : (
            <GatsbyImage image={image.gatsbyImageData} alt={image.title} />
          )}
        </div>
      )}
    </header>
  )
}

export default Header
