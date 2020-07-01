import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import ContentList from "./content-list"
import ContentCard from "./content-card"

const BlogPostList = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedAt, order: DESC }) {
        edges {
          node {
            id
            title
            author {
              name
            }
            image {
              fluid(maxWidth: 1024) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
            categories {
              title
            }
            fields {
              route
            }
          }
        }
      }
    }
  `)

  const posts = data.allContentfulBlogPost.edges.map(({ node }) => node)

  return (
    <ContentList
      data={posts}
      filter
      render={post => (
        <ContentCard
          key={post.id}
          to={post.fields.route}
          title={post.title}
          subtitle={`By ${post.author.name}`}
          image={post.image}
        />
      )}
    />
  )
}

export default BlogPostList
