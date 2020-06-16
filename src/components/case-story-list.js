import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import ArticleList from "./article-list"
import ArticleCard from "./article-card"

const CaseStoryList = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCaseStory(sort: { fields: publishedAt, order: DESC }) {
        edges {
          node {
            id
            title
            slug
            client
            image {
              fluid(maxWidth: 1024) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
            categories {
              title
            }
          }
        }
      }
    }
  `)

  const stories = data.allContentfulCaseStory.edges.map(({ node }) => node)

  return (
    <ArticleList
      data={stories}
      render={story => (
        <ArticleCard
          key={story.id}
          to={`/work/${story.slug}`}
          title={story.title}
          subtitle={`By ${story.client}`}
          image={story.image}
        />
      )}
    />
  )
}

export default CaseStoryList
