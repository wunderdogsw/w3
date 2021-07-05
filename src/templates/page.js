import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlockList from "../components/block-list"
import Article from "../components/article"
import RichText from "../components/rich-text"
import PageFooter from "../components/page-footer"

const getMetaImage = image => {
  return image ? image.fluid.src : null
}

const Page = ({ data }) => {
  const { page } = data
  const images = data.images.edges.map(({ node }) => node)
  const metaImg = getMetaImage(page.metaImage)

  return (
    <Layout footer={<PageFooter />}>
      <SEO
        title={page.metaTitle}
        description={page.metaDescription.metaDescription}
        metaImage={metaImg}
        metaTwitterCardType={page.twitterSharePreviewType}
      />
      {page.before && <BlockList data={page.before} />}
      {page.content && (
        <Article>
          <RichText document={page.content.json} images={images} />
        </Article>
      )}
      {page.after && <BlockList data={page.after} />}
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!, $images: [String!]!) {
    page: contentfulPage(slug: { eq: $slug }) {
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

export default Page
