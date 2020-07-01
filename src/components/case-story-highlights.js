import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import ContentList from "./content-list"
import ContentCard from "./content-card"

const CaseStoryHighlights = ({ button }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCaseStory(
        sort: { fields: publishedAt, order: DESC }
        limit: 4
      ) {
        edges {
          node {
            id
            title
            client
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

  const stories = data.allContentfulCaseStory.edges.map(({ node }) => node)

  return (
    <>
      <ContentList
        data={stories}
        render={story => (
          <ContentCard
            key={story.id}
            to={story.fields.route}
            title={story.title}
            subtitle={story.client}
            image={story.image}
          />
        )}
      />
      {button && <button>{button}</button>}
    </>
  )
}

export default CaseStoryHighlights
