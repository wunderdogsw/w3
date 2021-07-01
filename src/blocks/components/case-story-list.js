import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import ContentIndex from "../../components/content-index"
import ContentList from "../../components/content-list"

const CaseStoryList = ({ action }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCaseStory(sort: { fields: publishedAt, order: DESC }) {
        edges {
          node {
            id
            title
            client
            image {
              title
              fluid(sizes: "(max-width: 1024px) 400px, 1600px") {
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

  const stories = data.allContentfulCaseStory.edges.map(({ node }) => node)

  return (
    <ContentIndex>
      <ContentList
        data={stories}
        filter
        render={story => (
          <ContentList.Item
            key={story.id}
            to={story.fields.route}
            title={story.title}
            subtitle={story.client}
            link={action}
            image={
              <Image
                fluid={story.image.fluid}
                alt={story.image.title || story.title}
              />
            }
          />
        )}
      />
    </ContentIndex>
  )
}

export default CaseStoryList
