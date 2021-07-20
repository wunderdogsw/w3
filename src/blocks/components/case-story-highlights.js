import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { CASE_STORY_INDEX } from "../../common/routes"
import ContentList from "../../components/content-list"

const CaseStoryHighlights = ({ button, action }) => {
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
              gatsbyImageData(
                layout: FULL_WIDTH
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

  const stories = data.allContentfulCaseStory.edges.map(({ node }) => node)

  return (
    <>
      <ContentList
        data={stories}
        render={story => (
          <ContentList.Item
            key={story.id}
            to={story.fields.route}
            title={story.title}
            subtitle={story.client}
            link={action}
            image={
              <GatsbyImage
                image={story.image.gatsbyImageData}
                alt={story.image.title || story.title}
              />
            }
          />
        )}
      />
      {button && (
        <ContentList.Footer>
          <Link to={CASE_STORY_INDEX}>{button}</Link>
        </ContentList.Footer>
      )}
    </>
  )
}

export default CaseStoryHighlights
