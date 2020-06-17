import React from "react"
import Image from "gatsby-image"

const ImageBlock = ({ data }) => <Image fluid={data.image.fluid} />

export default ImageBlock
