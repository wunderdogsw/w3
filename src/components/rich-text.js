import React from "react"
import Image from "gatsby-image"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import componentBlocks from "../blocks/component-blocks"
import StatisticsBlock from "./statistics-block"

const COMPONENT_BLOCK = "componentBlock"
const STATISTICS_BLOCK = "statisticsBlock"

const findComponentBlock = data => {
  const componentName = data.target.fields.reactComponent["en-US"]

  return componentBlocks[componentName]
}

const renderEmbeddedEntry = data => {
  const contentType = data.target.sys.contentType.sys.id

  if (contentType === COMPONENT_BLOCK) {
    const EmbeddedComponentBlock = findComponentBlock(data)
    const props = data.target.fields.options["en-US"]

    return <EmbeddedComponentBlock {...props} />
  }

  if (contentType === STATISTICS_BLOCK) {
    const { statistics } = data.target.fields

    return <StatisticsBlock data={statistics["en-US"]} />
  }

  console.error("Unkown content type", contentType)
}

const findImage = (images, node) => {
  const { url } = node.data.target.fields.file["en-US"]

  return images.find(image => image.fluid.src.split("?")[0] === url)
}

const RichText = ({ document, images }) => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        return renderEmbeddedEntry(node.data)
      },
      [BLOCKS.EMBEDDED_ASSET]: node => {
        return <Image fluid={findImage(images, node).fluid} />
      },
    },
  }

  return <>{documentToReactComponents(document, options)}</>
}

export default RichText
