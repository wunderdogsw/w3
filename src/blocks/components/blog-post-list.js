import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import ContentIndex from "../../components/content-index"
import ContentList from "../../components/content-list"

const BlogPostList = ({ action }) => {
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
              title
              fluid(sizes: "(max-width: 1200px) 400px, 1600px") {
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
    <ContentIndex>
      <ContentList
        data={posts}
        filter
        render={post => (
          <ContentList.Item
            key={post.id}
            to={post.fields.route}
            title={post.title}
            subtitle={`By ${post.author.name}`}
            link={action}
            image={
              post.image && (
                <Image
                  fluid={post.image.fluid}
                  alt={post.image.title || post.title}
                />
              )
            }
          />
        )}
      />
    </ContentIndex>
  )
}

export default BlogPostList
