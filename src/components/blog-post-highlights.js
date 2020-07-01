import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import ContentList from "./content-list"
import ContentCard from "./content-card"

const BlogPostHighlights = ({ button }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(
        sort: { fields: publishedAt, order: DESC }
        limit: 2
      ) {
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
    <>
      <ContentList
        data={posts}
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
      {button && <button>{button}</button>}
    </>
  )
}

export default BlogPostHighlights
