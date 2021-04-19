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

const BlogPost = ({ data }) => {
  const { post, next } = data
  const images = data.images.edges.map(({ node }) => node)
  const metaImg = post.metaImage ? post.metaImage.fluid.src : null;
  const { author } = post

  return (
    <Layout
      footer={
        <ContentFooter
          title={next.title}
          subtitle="Go to next post"
          image={next.image.fluid.src}
          to={next.fields.route}
        />
      }
    >
      <SEO 
        title={post.title}
        description={post.metaDescription.metaDescription}         
        metaImage={metaImg}
        metaTwitterCardType={post.twitterSharePreviewType}
      />
      <Header
        title={post.title}
        subtitle={renderSubtitle(post, author)}
        image={post.video || post.image}
      />
      {post.before && <BlockList data={post.before} />}
      <Article>
        <RichText document={post.content.json} images={images} />
      </Article>
      {post.after && <BlockList data={post.after} />}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $next: String!, $images: [String!]!) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedAt(formatString: "MMM D, YYYY")
      image {
        fluid(maxWidth: 2560) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      metaDescription {
        metaDescription
      }
      metaImage {
        fluid(maxHeight: 1080) {
          src
        }
      }
      twitterSharePreviewType,
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
    next: contentfulBlogPost(slug: { eq: $next }) {
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

export default BlogPost
