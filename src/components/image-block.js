import React from "react"
import Image from "gatsby-image"

import styles from "./image-block.module.css"
import Video from "./video"

const renderAsset = asset => {
  const isVideo = () => asset && !asset.fluid

  if (isVideo()) {
    return <Video key={asset.id} src={`https:${asset.file.url}`} />
  }

  return <Image key={asset.id} fluid={asset.fluid} />
}

const ImageBlock = ({ data }) => (
  <div className={`${styles.wrapper} ${styles[data.align]}`}>
    {data.images.map(image => renderAsset(image))}
  </div>
)

export default ImageBlock
