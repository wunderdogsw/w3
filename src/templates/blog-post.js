import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import RichText from "../components/rich-text"
import ContentFooter from "../components/content-footer"

const renderAuthor = author => (
  <div>
    By {author.name}
    {author.title && `, ${author.title}`}
  </div>
)

const BlogPost = ({ data }) => {
  const { post, next } = data
  const images = data.images.edges.map(({ node }) => node)
  const { author } = post

  return (
    <Layout>
      <SEO title={post.title} />
      <article>
        <header>
          <h1>{post.title}</h1>
          {renderAuthor(author)}
          <div>{post.publishedAt}</div>
          <div>Read time {post.readingTime} min</div>
        </header>
        <Image fluid={post.image.fluid} />
        <RichText document={post.content.json} images={images} />
      </article>
      <ContentFooter
        title={next.title}
        subtitle="Go to next post"
        to={next.fields.route}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $next: String!, $images: [String!]!) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedAt(formatString: "MMMM D, YYYY")
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
    next: contentfulBlogPost(slug: { eq: $next }) {
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

export default BlogPost
