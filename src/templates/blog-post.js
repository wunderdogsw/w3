import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"
import BlockList from "../components/block-list"
import RichText from "../components/rich-text"
import Article from "../components/article"
import ContentFooter from "../components/content-footer"
import SecondaryText from "../components/secondary-text"

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
    metaImage = post.image.file.url
  }

  if (post.metaImage) {
    metaImage = post.metaImage.file.url
  }

  return metaImage
}

const BlogPost = ({ data }) => {
  const { post, next } = data
  const metaTitle = post.metaTitle ?? post.title
  const metaImage = getMetaImage(post)
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
        title={metaTitle}
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
        <RichText content={post.content} />
      </Article>
      {post.after && <BlockList data={post.after} />}
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!, $next: String!) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedAt(formatString: "MMM D, YYYY")
      image {
        title
        gatsbyImageData
        file {
          url
        }
      }
      metaTitle
      metaDescription {
        metaDescription
      }
      metaImage {
        gatsbyImageData
        file {
          url
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
        references {
          ... on ContentfulAsset {
            # __typename and contentful_id are required to resolve the references
            __typename
            contentful_id
            title
            gatsbyImageData
            file {
              contentType
            }
          }
          ... on ContentfulHubSpotFormBlock {
            ...HubSpotFormBlock
          }
          ... on ContentfulHyperlinkButtonBlock {
            ...HyperlinkButtonBlock
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
    next: contentfulBlogPost(slug: { eq: $next }) {
      title
      image {
        gatsbyImageData
      }
      fields {
        route
      }
    }
  }
`

export default BlogPost
