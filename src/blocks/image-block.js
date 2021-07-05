import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

import * as styles from "./image-block.module.css"
import Video from "../components/video"

const renderAsset = asset => {
  const isVideo = () => asset && !asset.fluid

  if (isVideo()) {
    return <Video key={asset.id} src={`https:${asset.file.url}`} />
  }

  return (
    <GatsbyImage
      image={asset.gatsbyImageData}
      key={asset.id}
      alt={asset.title}
    />
  )
}

const ImageBlock = ({ data }) => (
  <div className={`${styles.wrapper} ${styles[data.align]}`}>
    {data.images.map(image => renderAsset(image))}
  </div>
)

export default ImageBlock
