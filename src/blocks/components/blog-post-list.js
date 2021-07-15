import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

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
              gatsbyImageData(
                layout: FULL_WIDTH
                breakpoints: [320, 480, 740, 1024, 1200, 1600, 2400]
                sizes: "(max-width: 739px) 100vw, 50vw"
              )
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
                <GatsbyImage
                  image={post.image.gatsbyImageData}
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
