import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import ContentList from "./content-list"
import ContentCard from "./content-card"

const CaseStoryList = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCaseStory(sort: { fields: publishedAt, order: DESC }) {
        edges {
          node {
            id
            title
            client
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

  const stories = data.allContentfulCaseStory.edges.map(({ node }) => node)

  return (
    <ContentList
      data={stories}
      filter
      render={story => (
        <ContentCard
          key={story.id}
          to={story.fields.route}
          title={story.title}
          subtitle={`By ${story.client}`}
          image={story.image}
        />
      )}
    />
  )
}

export default CaseStoryList
