import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { BLOG_POST_INDEX } from "../../common/routes"
import ContentList from "../../components/content-list"
import ContentListFooter from "../../components/content-list-footer"
import ContentCard from "../../components/content-card"

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
              fluid(maxWidth: 2048) {
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
            link={action}
            image={post.image}
          />
        )}
      />
      {button && (
        <ContentListFooter>
          <Link to={BLOG_POST_INDEX}>{button}</Link>
        </ContentListFooter>
      )}
    </>
  )
}

export default BlogPostHighlights
