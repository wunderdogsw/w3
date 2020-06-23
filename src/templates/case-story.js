import React from "react"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import RichText from "../components/rich-text"
import ContentFooter from "../components/content-footer"

const CaseStory = ({ data }) => {
  const { story, next } = data
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
      <ContentFooter
        title={next.title}
        subtitle="Go to next case"
        to={next.fields.route}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $next: String!, $images: [String!]!) {
    story: contentfulCaseStory(slug: { eq: $slug }) {
      title
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
    next: contentfulCaseStory(slug: { eq: $next }) {
      title
      fields {
        route
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
