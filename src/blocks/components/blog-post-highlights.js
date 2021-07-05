import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

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
              fluid(sizes: "(max-width: 1200px) 512px, 1600px") {
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
          <ContentList.Item
            key={post.id}
            to={post.fields.route}
            title={post.title}
            subtitle={`By ${post.author.name}`}
            link={action}
            image={
              <Image
                fluid={post.image.fluid}
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
