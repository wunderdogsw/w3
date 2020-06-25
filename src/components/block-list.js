import React from "react"
import { graphql } from "gatsby"

import blocks from "../blocks/blocks"
import componentBlocks from "../blocks/component-blocks"

const CONTENTFUL_COMPONENT_BLOCK = "ContentfulComponentBlock"

const renderComponentBlock = (id, name, options) => {
  const ComponentBlock = componentBlocks[name]
  const props = options ? JSON.parse(options.internal.content) : {}

  return <ComponentBlock key={id} {...props} />
}

const renderBlock = block => {
  if (block.__typename === CONTENTFUL_COMPONENT_BLOCK) {
    return renderComponentBlock(block.id, block.reactComponent, block.options)
  }

  const BlockComponent = blocks[block.__typename]

  return <BlockComponent key={block.id} data={block} />
}

const BlockList = ({ data }) => <>{data.map(block => renderBlock(block))}</>

export const query = graphql`
  fragment HeroBlock on ContentfulHeroBlock {
    id
    title
  }

  fragment SectionBlock on ContentfulSectionBlock {
    id
    image {
      fluid(maxWidth: 2560) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    heading
    content {
      json
    }
  }

  fragment ImageBlock on ContentfulImageBlock {
    id
    image {
      fluid(maxWidth: 2560) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }

  fragment OfficeBlock on ContentfulOfficeBlock {
    id
    image {
      fluid(maxWidth: 2560) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    name
    streetAddress
    zipCode
    city
    country
    googleMapsUrl
    contacts {
      id
      name
      position
      phone
      email
    }
  }

  fragment StatisticsBlock on ContentfulStatisticsBlock {
    id
    statistics {
      id
      value
      description
    }
  }

  fragment LogosBlock on ContentfulLogosBlock {
    id
    heading
    content {
      json
    }
    images {
      file {
        url
      }
    }
  }

  fragment ComponentBlock on ContentfulComponentBlock {
    id
    reactComponent
    options {
      internal {
        content
      }
    }
  }
`

export default BlockList