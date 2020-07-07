import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"
import Article from "../components/article"
import BlockList from "../components/block-list"
import RichText from "../components/rich-text"
import ContentFooter from "../components/content-footer"

const CaseStory = ({ data }) => {
  const { story, next } = data
  const images = data.images.edges.map(({ node }) => node)

  return (
    <Layout
      footer={
        <ContentFooter
          title={next.title}
          subtitle="Go to next case"
          image={next.image.fluid.src}
          to={next.fields.route}
        />
      }
    >
      <SEO title={story.title} />
      <Header
        title={story.title}
        subtitle={story.client}
        image={story.video || story.image}
      />
      {story.before && <BlockList data={story.before} />}
      {story.content && (
        <Article>
          <RichText document={story.content.json} images={images} />
        </Article>
      )}
      {story.after && <BlockList data={story.after} />}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $next: String!, $images: [String!]!) {
    story: contentfulCaseStory(slug: { eq: $slug }) {
      title
      image {
        fluid(maxWidth: 2560) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      video {
        file {
          url
        }
      }
      client
      content {
        json
      }
      before {
        __typename
        ... on Node {
          ... on ContentfulHeaderBlock {
            ...HeaderBlock
          }
          ... on ContentfulSectionBlock {
            ...SectionBlock
          }
          ... on ContentfulImageBlock {
            ...ImageBlock
          }
          ... on ContentfulOfficeBlock {
            ...OfficeBlock
          }
          ... on ContentfulStatisticsBlock {
            ...StatisticsBlock
          }
          ... on ContentfulLogosBlock {
            ...LogosBlock
          }
          ... on ContentfulContactBlock {
            ...ContactBlock
          }
          ... on ContentfulHubSpotFormBlock {
            ...HubSpotFormBlock
          }
          ... on ContentfulComponentBlock {
            ...ComponentBlock
          }
        }
      }
      after {
        __typename
        ... on Node {
          ... on ContentfulHeaderBlock {
            ...HeaderBlock
          }
          ... on ContentfulSectionBlock {
            ...SectionBlock
          }
          ... on ContentfulImageBlock {
            ...ImageBlock
          }
          ... on ContentfulOfficeBlock {
            ...OfficeBlock
          }
          ... on ContentfulStatisticsBlock {
            ...StatisticsBlock
          }
          ... on ContentfulLogosBlock {
            ...LogosBlock
          }
          ... on ContentfulContactBlock {
            ...ContactBlock
          }
          ... on ContentfulHubSpotFormBlock {
            ...HubSpotFormBlock
          }
          ... on ContentfulComponentBlock {
            ...ComponentBlock
          }
        }
      }
    }
    next: contentfulCaseStory(slug: { eq: $next }) {
      title
      image {
        fluid(maxWidth: 2560) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      fields {
        route
      }
    }
    images: allContentfulAsset(filter: { file: { url: { in: $images } } }) {
      edges {
        node {
          fluid(maxWidth: 2560) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`

export default CaseStory
