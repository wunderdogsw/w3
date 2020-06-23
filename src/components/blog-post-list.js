import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import ArticleList from "./article-list"
import ArticleCard from "./article-card"

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
    <ArticleList
      data={posts}
      filter
      render={post => (
        <ArticleCard
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
