import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import ArticleList from "./article-list"
import ArticleCard from "./article-card"

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
    <>
      <ArticleList
        data={stories}
        render={story => (
          <ArticleCard
            key={story.id}
            to={story.fields.route}
            title={story.title}
            subtitle={`By ${story.client}`}
            image={story.image}
          />
        )}
      />
      {button && <button>{button}</button>}
    </>
  )
}

export default CaseStoryHighlights
