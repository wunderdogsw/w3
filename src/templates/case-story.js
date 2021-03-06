import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"
import BlockList from "../components/block-list"
import RichText from "../components/rich-text"
import Article from "../components/article"
import ContentFooter from "../components/content-footer"
import { getMetaImageSrc } from "../common/utils"

const CaseStory = ({ data }) => {
  const { story, next } = data
  const metaImage = getMetaImageSrc(story)
  const metaTitle = story.metaTitle ?? story.title

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
        title={metaTitle}
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
          <RichText content={story.content} />
        </Article>
      )}
      {story.after && <BlockList data={story.after} />}
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!, $next: String!) {
    story: contentfulCaseStory(slug: { eq: $slug }) {
      title
      image {
        title
        gatsbyImageData(layout: FULL_WIDTH)
      }
      metaTitle
      metaDescription {
        metaDescription
      }
      metaImage {
        gatsbyImageData(layout: FIXED, width: 1920)
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
        gatsbyImageData(layout: FULL_WIDTH)
      }
      fields {
        route
      }
    }
  }
`

export default CaseStory
