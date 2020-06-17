import React from "react"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import RichText from "../components/rich-text-"

const CaseStory = ({ data }) => {
  const story = data.story
  const images = data.images.edges.map(({ node }) => node)

  return (
    <Layout>
      <SEO title={story.title} />
      <article>
        <header>
          <h1>{story.title}</h1>
          <div>{story.client}</div>
        </header>
        <Image fluid={story.image.fluid} />
        <RichText document={story.content.json} images={images} />
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
