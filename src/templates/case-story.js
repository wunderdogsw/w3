import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"
import Article from "../components/article"
import BlockList from "../components/block-list"
import RichText from "../components/rich-text"
import ContentFooter from "../components/content-footer"

const getMetaImage = story => {
  let metaImage = null

  if (story.image) {
    metaImage = story.image.fluid.src
  }

  if (story.metaImage) {
    metaImage = story.metaImage.fluid.src
  }

  return metaImage
}

const CaseStory = ({ data }) => {
  const { story, next } = data
  const images = data.images.edges.map(({ node }) => node)
  const metaImage = getMetaImage(story)

  return (
    <Layout
      footer={
        <ContentFooter
          title={next.title}
          subtitle="Go to next case"
          image={next.image}
          to={next.fields.route}
        />
      }
    >
      <SEO
        title={story.metaTitle}
        description={
          story.metaDescription ? story.metaDescription.metaDescription : null
        }
        metaImage={metaImage}
        metaTwitterCardType={story.twitterSharePreviewType}
      />
      <Header
        title={story.title}
        subtitle={story.client}
        image={story.video || story.image}
      />
      {story.before && <BlockList data={story.before} />}
      {story.content && (
        <Article>
          <RichText document={JSON.parse(story.content.raw)} images={images} />
        </Article>
      )}
      {story.after && <BlockList data={story.after} />}
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!, $next: String!, $images: [String!]!) {
    story: contentfulCaseStory(slug: { eq: $slug }) {
      title
      image {
        title
        fluid(sizes: "(max-width: 1200px) 400px, 1600px") {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      metaTitle
      metaDescription {
        metaDescription
      }
      metaImage {
        fluid(maxHeight: 1080) {
          src
        }
      }
      twitterSharePreviewType
      video {
        file {
          url
        }
      }
      client
      content {
        raw
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
          ... on ContentfulQuoteBlock {
            ...QuoteBlock
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
          ... on ContentfulHyperlinkButtonBlock {
            ...HyperlinkButtonBlock
          }
          ... on ContentfulTableBlock {
            ...TableBlock
          }
          ... on ContentfulHubSpotMeetingBlock {
            ...HubSpotMeetingBlock
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
          ... on ContentfulQuoteBlock {
            ...QuoteBlock
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
          ... on ContentfulHyperlinkButtonBlock {
            ...HyperlinkButtonBlock
          }
          ... on ContentfulTableBlock {
            ...TableBlock
          }
          ... on ContentfulHubSpotMeetingBlock {
            ...HubSpotMeetingBlock
          }
        }
      }
    }
    next: contentfulCaseStory(slug: { eq: $next }) {
      title
      image {
        fluid(
          sizes: "(max-width: 786px) 800px, (max-width: 1200px) 1200px, 1600px"
        ) {
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
          fluid(
            sizes: "(max-width: 786px) 800px, (max-width: 1200px) 1200px, 2400px"
          ) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`

export default CaseStory
