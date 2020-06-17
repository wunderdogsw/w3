import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import RichText from "../components/rich-text-"

const BlogPost = ({ data }) => {
  const { post } = data
  const images = data.images.edges.map(({ node }) => node)
  const { author } = post

  return (
    <Layout>
      <SEO title={post.title} />
      <article>
        <header>
          <h1>{post.title}</h1>
          <div>
            By {author.name}, {author.title}
          </div>
          <div>{post.publishedAt}</div>
          <div>Read time {post.readingTime} min</div>
        </header>
        <Image fluid={post.image.fluid} />
        <RichText document={post.content.json} images={images} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $images: [String!]!) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      publishedAt
      image {
        fluid(maxWidth: 2560) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      author {
        name
        title
      }
      readingTime
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

export default BlogPost
