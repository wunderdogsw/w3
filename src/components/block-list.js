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
      gatsbyImageData(layout: FULL_WIDTH)
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
      gatsbyImageData(layout: FULL_WIDTH)
    }
    heading
    content {
      raw
      references {
        ... on ContentfulHubSpotFormBlock {
          ...HubSpotFormBlock
        }
        ... on ContentfulHyperlinkButtonBlock {
          ...HyperlinkButtonBlock
        }
        ... on ContentfulTableBlock {
          ...TableBlock
        }
      }
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
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }

  fragment HyperlinkButtonBlock on ContentfulHyperlinkButtonBlock {
    # __typename and contentful_id are required to resolve the references
    __typename
    contentful_id
    id
    embeddedLink
    textContent
    align
  }

  fragment OfficeBlock on ContentfulOfficeBlock {
    id
    image {
      title
      gatsbyImageData(layout: FULL_WIDTH)
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
      raw
    }
    images {
      id
      title
      gatsbyImageData(
        breakpoints: [110, 150, 170, 340, 510]
        sizes: "(max-width: 768px) 50vw, 13w"
        placeholder: TRACED_SVG
      )
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
        gatsbyImageData(
          breakpoints: [145, 200, 400, 600]
          sizes: "(max-width: 480px) 145px, (max-width: 768px) 200px, 600px"
        )
      }
      phone
      email
    }
  }

  fragment HubSpotFormBlock on ContentfulHubSpotFormBlock {
    # __typename and contentful_id are required to resolve the references
    __typename
    contentful_id
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
    # __typename and contentful_id are required to resolve the references
    __typename
    contentful_id
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
