import React from "react"
import Image from "gatsby-image"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import StatisticsBlock from "./statistics-block"

const findImage = (images, node) => {
  const { url } = node.data.target.fields.file["en-US"]

  return images.find(image => image.fluid.src.split("?")[0] === url)
}

const RichText = ({ document, images }) => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        const { statistics } = node.data.target.fields

        return <StatisticsBlock data={statistics["en-US"]} />
      },
      [BLOCKS.EMBEDDED_ASSET]: node => {
        return <Image fluid={findImage(images, node).fluid} />
      },
    },
  }

  return <>{documentToReactComponents(document, options)}</>
}

export default RichText
