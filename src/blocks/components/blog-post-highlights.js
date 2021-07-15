import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { BLOG_POST_INDEX } from "../../common/routes"
import ContentList from "../../components/content-list"

const BlogPostHighlights = ({ button, action }) => {
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
    <>
      <ContentList
        data={posts}
        render={post => (
          <ContentList.Item
            key={post.id}
            to={post.fields.route}
            title={post.title}
            subtitle={`By ${post.author.name}`}
            link={action}
            image={
              <GatsbyImage
                image={post.image.gatsbyImageData}
                alt={post.image.title || post.title}
              />
            }
          />
        )}
      />
      {button && (
        <ContentList.Footer>
          <Link to={BLOG_POST_INDEX}>{button}</Link>
        </ContentList.Footer>
      )}
    </>
  )
}

export default BlogPostHighlights
