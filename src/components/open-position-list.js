import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import OpenPosition from "./open-position"

const OpenPositionList = ({ heading }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulOpenPosition(filter: { published: { eq: true } }) {
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
    <div>
      <h2>{heading}</h2>
      {positions.map(position => (
        <OpenPosition
          key={position.id}
          title={position.position}
          office={position.office}
          link={position.link}
        />
      ))}
    </div>
  )
}

export default OpenPositionList
