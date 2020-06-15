import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import BlogPostCard from "./blog-post-card"

const BlogPostList = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedAt, order: DESC }) {
        edges {
          node {
            id
            title
            slug
            author {
              name
            }
            image {
              fluid(maxWidth: 1024) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div>
      {data.allContentfulBlogPost.edges.map(({ node }) => (
        <BlogPostCard
          key={node.id}
          title={node.title}
          authorName={node.author.name}
          image={node.image}
        />
      ))}
    </div>
  )
}

export default BlogPostList
