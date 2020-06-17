import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import ArticleList from "./article-list"
import ArticleCard from "./article-card"

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
            slug
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
          }
        }
      }
    }
  `)

  const posts = data.allContentfulBlogPost.edges.map(({ node }) => node)

  return (
    <>
      <ArticleList
        data={posts}
        render={post => (
          <ArticleCard
            key={post.id}
            to={`/blog/${post.slug}`}
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
