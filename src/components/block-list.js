import React from "react"
import { graphql } from "gatsby"

import * as blocks from "../blocks"

const CONTENTFUL_COMPONENT_BLOCK = "ContentfulComponentBlock"

const renderComponentBlock = (id, name, options) => {
  const ComponentBlock = blocks.components[name]
  const props = options ? JSON.parse(options.internal.content) : {}

  return <ComponentBlock key={id} {...props} />
}

const renderBlock = block => {
  if (block.__typename === CONTENTFUL_COMPONENT_BLOCK) {
    return renderComponentBlock(block.id, block.reactComponent, block.options)
  }

  // eslint-disable-next-line import/namespace
  const BlockComponent = blocks[block.__typename]

  return <BlockComponent key={block.id} data={block} />
}

const BlockList = ({ data }) => <>{data.map(block => renderBlock(block))}</>

export const query = graphql`
  fragment HeaderBlock on ContentfulHeaderBlock {
    id
    title
    subtitle
    image {
      title
      file {
        url
      }
      fluid(
        sizes: "(max-width: 480px) 800px, (max-width: 1200px) 1200px, 2048px"
      ) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    hero
  }

  fragment SectionBlock on ContentfulSectionBlock {
    id
    image {
      title
      file {
        url
      }
      fluid(
        sizes: "(max-width: 480px) 800px, (max-width: 1200px) 1200px, 2400px"
      ) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    heading
    content {
      json
    }
    animated
  }

  fragment QuoteBlock on ContentfulQuoteBlock {
    id
    content {
      content
    }
    author
  }

  fragment ImageBlock on ContentfulImageBlock {
    id
    align
    images {
      id
      title
      file {
        url
      }
      fluid(
        sizes: "(max-width: 480px) 800px, (max-width: 1200px) 1200px, 2618px"
      ) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }

  fragment HyperlinkButtonBlock on ContentfulHyperlinkButtonBlock {
    id
    embeddedLink
    textContent
    align
  }

  fragment OfficeBlock on ContentfulOfficeBlock {
    id
    image {
      title
      fluid(
        sizes: "(max-width: 480px) 800px, (max-width: 1200px) 1200px, 2400px"
      ) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    name
    streetAddress
    zipCode
    city
    country
    businessId
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
      id
      title
      fluid(sizes: "(max-width: 1200px) 400px, 1600px") {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }

  fragment ContactBlock on ContentfulContactBlock {
    id
    heading
    contact {
      name
      position
      image {
        title
        fluid(maxWidth: 400) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      phone
      email
    }
  }

  fragment HubSpotFormBlock on ContentfulHubSpotFormBlock {
    id
    formId
    gaLabel
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

  fragment TableBlock on ContentfulTableBlock {
    id
    table {
      id
      tableData
    }
  }

  fragment HubSpotMeetingBlock on ContentfulHubSpotMeetingBlock {
    id
    html {
      html
    }
  }
`

export default BlockList
