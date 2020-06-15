import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPost = ({ data }) => {
  const post = data.contentfulBlogPost
  const { author } = post

  return (
    <Layout>
      <SEO title={post.title} description={`TODO: add`} />
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
        {documentToReactComponents(post.content.json)}
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
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
  }
`

export default BlogPost
