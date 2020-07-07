import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlockList from "../components/block-list"
import Article from "../components/article"
import RichText from "../components/rich-text"
import PageFooter from "../components/page-footer"

const Page = ({ data }) => {
  const { page } = data
  const images = data.images.edges.map(({ node }) => node)

  return (
    <Layout footer={<PageFooter />}>
      <SEO
        title={page.metaTitle}
        description={page.metaDescription.metaDescription}
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
  query($slug: String!, $images: [String!]!) {
    page: contentfulPage(slug: { eq: $slug }) {
      metaTitle
      metaDescription {
        metaDescription
      }
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
