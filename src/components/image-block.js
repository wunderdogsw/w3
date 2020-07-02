import React from "react"
import Image from "gatsby-image"

import styles from "./image-block.module.css"

const ImageBlock = ({ data }) => (
  <div className={`${styles.wrapper} ${styles[data.align]}`}>
    {data.images.map(image => (
      <Image key={image.id} fluid={image.fluid} />
    ))}
  </div>
)

export default ImageBlock
