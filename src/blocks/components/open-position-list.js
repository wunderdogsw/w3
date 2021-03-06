import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import * as styles from "./open-position-list.module.css"
import OpenPosition from "../../components/open-position"

const OpenPositionList = ({ heading }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulOpenPosition(
        filter: { published: { eq: true } }
        sort: { fields: publishedAt, order: DESC }
      ) {
        edges {
          node {
            id
            position
            office
            link
          }
        }
      }
    }
  `)

  const positions = data.allContentfulOpenPosition.edges.map(({ node }) => node)

  return (
    <div className={styles.wrapper} id="career_open_position">
      <h2 dangerouslySetInnerHTML={{ __html: heading }} />
      <div>
        {positions.map(position => (
          <OpenPosition
            key={position.id}
            title={position.position}
            office={position.office}
            link={position.link}
          />
        ))}
      </div>
    </div>
  )
}

export default OpenPositionList
