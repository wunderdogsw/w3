import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import ContentIndex from "../../components/content-index"
import ContentList from "../../components/content-list"
import ContentCard from "../../components/content-card"

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
    <ContentIndex>
      <ContentList
        data={stories}
        filter
        render={story => (
          <ContentCard
            key={story.id}
            to={story.fields.route}
            title={story.title}
            subtitle={`By ${story.client}`}
            link={action}
            image={story.image}
          />
        )}
      />
    </ContentIndex>
  )
}

export default CaseStoryList
