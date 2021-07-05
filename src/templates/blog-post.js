import React from "react"
import { graphql } from "gatsby"

import SecondaryText from "../components/secondary-text"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Article from "../components/article"
import Header from "../components/header"
import BlockList from "../components/block-list"
import RichText from "../components/rich-text"
import ContentFooter from "../components/content-footer"

const renderAuthor = author => (
  <>
    By {author.name}
    {author.title && (
      <>
        , <SecondaryText>{author.title}</SecondaryText>
      </>
    )}
  </>
)

const renderSubtitle = (post, author) => (
  <>
    {renderAuthor(author)} • {post.publishedAt} • Read time {post.readingTime}{" "}
    min
  </>
)

const getMetaImage = post => {
  let metaImage = null

  if (post.image) {
    metaImage = post.image.fluid.src
  }

  if (post.metaImage) {
    metaImage = post.metaImage.fluid.src
  }

  return metaImage
}

const BlogPost = ({ data }) => {
  const { post, next } = data
  const images = data.images.edges.map(({ node }) => node)
  const metaImage = getMetaImage(post, images)
  const { author } = post

  return (
    <Layout
      footer={
        <ContentFooter
          title={next.title}
          subtitle="Go to next post"
          image={next.image}
          to={next.fields.route}
        />
      }
    >
      <SEO
        title={post.metaTitle}
        description={
          post.metaDescription ? post.metaDescription.metaDescription : null
        }
        metaImage={metaImage}
        metaTwitterCardType={post.twitterSharePreviewType}
      />
      <Header
        title={post.title}
        subtitle={renderSubtitle(post, author)}
        image={post.video || post.image}
      />
      {post.before && <BlockList data={post.before} />}
      <Article>
        <RichText document={post.content.raw} images={images} />
      </Article>
      {post.after && <BlockList data={post.after} />}
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!, $next: String!, $images: [String!]!) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedAt(formatString: "MMM D, YYYY")
      image {
        title
        fluid(
          sizes: "(max-width: 480px) 640px, (max-width: 1200px) 1280px, 2048px"
        ) {
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
      author {
        name
        title
      }
      readingTime
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
    next: contentfulBlogPost(slug: { eq: $next }) {
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

export default BlogPost
