import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlockList from "../components/block-list"
import RichText from "../components/rich-text"
import Article from "../components/article"
import PageFooter from "../components/page-footer"
import { getMetaImageSrc } from "../common/utils"

const Page = ({ data }) => {
  const { page } = data
  const metaImage = getMetaImageSrc(page)

  return (
    <Layout footer={<PageFooter />}>
      <SEO
        title={page.metaTitle}
        description={page.metaDescription.metaDescription}
        metaImage={metaImage}
        metaTwitterCardType={page.twitterSharePreviewType}
      />
      {page.before && <BlockList data={page.before} />}
      {page.content && (
        <Article>
          <RichText content={page.content} />
        </Article>
      )}
      {page.after && <BlockList data={page.after} />}
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      metaTitle
      metaDescription {
        metaDescription
      }
      metaImage {
        gatsbyImageData(layout: FIXED, width: 1920)
      }
      twitterSharePreviewType
      content {
        raw
        references {
          # __typename and contentful_id are required to resolve the references
          __typename
          contentful_id
          table {
            tableData
          }
        }
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
  }
`

export default Page
