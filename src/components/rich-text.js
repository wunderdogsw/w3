import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS } from "@contentful/rich-text-types"

import Video from "../components/video"
import * as blocks from "../blocks"

const COMPONENT_BLOCK = "componentBlock"

const findComponentBlock = data => {
  const componentName = data.target.fields.reactComponent["en-US"]

  return blocks.components[componentName]
}

// please see: https://www.npmjs.com/package/@contentful/rich-text-react-renderer
const renderTextWithLineBreaks = text =>
  text.split("\n").reduce((children, textSegment, index) => {
    return [...children, index > 0 && <br key={index} />, textSegment]
  }, [])

const renderBlocksAndComponents = node => {
  const { data } = node
  const contentType = data.target.__typename

  if (contentType === COMPONENT_BLOCK) {
    const EmbeddedComponentBlock = findComponentBlock(data)
    const props = data.target.options["en-US"]

    return <EmbeddedComponentBlock {...props} />
  }

  // eslint-disable-next-line import/namespace
  const EmbeddedBlock = blocks[contentType]
  if (EmbeddedBlock) {
    return <EmbeddedBlock data={data.target} />
  }

  console.error("Unknown block", contentType)
}

const renderImagesAndVideos = node => {
  const { title, file, gatsbyImageData } = node.data.target
  if (gatsbyImageData) {
    return <GatsbyImage image={gatsbyImageData} alt={title} />
  }

  const isVideo = file.contentType.indexOf("video/") === 0
  if (isVideo) {
    return <Video src={`https:${file.url}`} />
  }

  throw new Error("Unknown embedded asset type")
}

const RichText = ({ content }) => {
  const options = {
    renderText: renderTextWithLineBreaks,
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: renderBlocksAndComponents,
      [BLOCKS.EMBEDDED_ASSET]: renderImagesAndVideos,
    },
  }

  return renderRichText(content, options)
}

export default RichText
