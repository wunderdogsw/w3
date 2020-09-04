import React from "react"
import Image from "gatsby-image"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import { capitalize } from "../common/utils"
import { isImage, isVideo } from "../common/entry"
import * as blocks from "../blocks"
import Video from "../components/video"

const COMPONENT_BLOCK = "componentBlock"

const isSerialized = value => !(Array.isArray(value) && value[0].fields)

const serializeData = target => {
  const { fields } = target

  return Object.keys(fields).reduce(
    (result, key) => {
      const value = fields[key]["en-US"]

      let serializedValue
      if (!isSerialized(value)) {
        serializedValue = value.map(item => serializeData(item))
      } else {
        serializedValue = value
      }

      return { ...result, [key]: serializedValue }
    },
    { id: target.sys.id }
  )
}

const findComponentBlock = data => {
  const componentName = data.target.fields.reactComponent["en-US"]

  return blocks.components[componentName]
}

const renderTextWithLineBreaks = text => {
  return text.split("\n").flatMap((text, i) => [i > 0 && <br />, text])
}

const renderEmbeddedEntry = data => {
  const contentType = data.target.sys.contentType.sys.id

  if (contentType === COMPONENT_BLOCK) {
    const EmbeddedComponentBlock = findComponentBlock(data)
    const props = data.target.fields.options["en-US"]

    return <EmbeddedComponentBlock {...props} />
  }

  const block = `Contentful${capitalize(contentType)}`
  const EmbeddedBlock = blocks[block]
  if (EmbeddedBlock) {
    const serializedData = serializeData(data.target)

    return <EmbeddedBlock data={serializedData} />
  }

  console.error("Unknown block", block)
}

const findImage = (images, node) => {
  const { url } = node.data.target.fields.file["en-US"]

  return images.find(image => image.fluid.src.split("?")[0] === url)
}

const RichText = ({ document, images }) => {
  const options = {
    renderText: text => renderTextWithLineBreaks(text),
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        return renderEmbeddedEntry(node.data)
      },
      [BLOCKS.EMBEDDED_ASSET]: node => {
        if (isImage(node)) {
          return <Image fluid={findImage(images, node).fluid} />
        }

        if (isVideo(node)) {
          return (
            <Video src={`https:${node.data.target.fields.file["en-US"].url}`} />
          )
        }

        throw "Unknown embedded asset type"
      },
    },
  }

  return <>{documentToReactComponents(document, options)}</>
}

export default RichText
