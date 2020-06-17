import React from "react"
import Image from "gatsby-image"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StatisticsBlock from "../components/statistics-block"

const findImage = (images, node) => {
  const { url } = node.data.target.fields.file["en-US"]

  return images.find(image => image.fluid.src.split("?")[0] === url)
}

const CaseStory = ({ data }) => {
  const story = data.story
  const images = data.images.edges.map(({ node }) => node)
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

  return (
    <Layout>
      <SEO title={story.title} />
      <article>
        <header>
          <h1>{story.title}</h1>
          <div>{story.client}</div>
        </header>
        <Image fluid={story.image.fluid} />
        {documentToReactComponents(story.content.json, options)}
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $images: [String!]!) {
    story: contentfulCaseStory(slug: { eq: $slug }) {
      title
      slug
      image {
        fluid(maxWidth: 2560) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      client
      content {
        json
      }
    }
    images: allContentfulAsset(filter: { file: { url: { in: $images } } }) {
      edges {
        node {
          fluid(maxWidth: 2560) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`

export default CaseStory
