import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

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
          <ContentList.Item
            key={story.id}
            to={story.fields.route}
            title={story.title}
            subtitle={story.client}
            link={action}
            image={<Image fluid={story.image.fluid} />}
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