import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { CASE_STORY_INDEX } from "../common/routes"
import ContentList from "./content-list"
import ContentListFooter from "./content-list-footer"
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
      {button && (
        <ContentListFooter>
          <Link to={CASE_STORY_INDEX}>{button}</Link>
        </ContentListFooter>
      )}
    </>
  )
}

export default CaseStoryHighlights
