import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlockList from "../components/block-list"
import PageFooter from "../components/page-footer"
import RichText from "../components/rich-text"

const Page = ({ data }) => {
  const { page, images } = data

  return (
    <Layout footer>
      <SEO
        title={page.metaTitle}
        description={page.metaDescription.metaDescription}
      />
      {page.before && <BlockList data={page.before} />}
      {page.content && (
        <RichText document={page.content.json} images={images} />
      )}
      {page.after && <BlockList data={page.after} />}
      <PageFooter />
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
          ... on ContentfulHeroBlock {
            ...HeroBlock
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
          ... on ContentfulComponentBlock {
            ...ComponentBlock
          }
        }
      }
      after {
        __typename
        ... on Node {
          ... on ContentfulHeroBlock {
            ...HeroBlock
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
