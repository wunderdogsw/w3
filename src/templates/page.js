import React from "react"

import blocks from "../blocks/blocks"
import componentBlocks from "../blocks/component-blocks"
import Layout from "../components/layout"
import SEO from "../components/seo"

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

const Page = ({ data }) => {
  const page = data.contentfulPage

  return (
    <Layout>
      <SEO
        title={page.metaTitle}
        description={page.metaDescription.metaDescription}
      />
      {page.blocks.map(block => renderBlock(block))}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      metaTitle
      metaDescription {
        metaDescription
      }
      blocks {
        __typename
        ... on Node {
          ... on ContentfulHeroBlock {
            id
            heading
          }
          ... on ContentfulComponentBlock {
            id
            reactComponent
            options {
              internal {
                content
              }
            }
          }
        }
      }
    }
  }
`

export default Page
