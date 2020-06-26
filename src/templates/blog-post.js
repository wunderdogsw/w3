import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

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
  const { author } = post

  console.log(next.image)

  return (
    <Layout>
      <SEO title={post.title} />
      <Header
        title={post.title}
        subtitle={renderSubtitle(post, author)}
        image={post.image}
      >
        <h1>{post.title}</h1>
        <div>
          {renderAuthor(author)} • {post.publishedAt} • Read time{" "}
          {post.readingTime} min
        </div>
        <Image fluid={post.image.fluid} />
      </Header>
      {post.before && <BlockList data={post.before} />}
      <Article>
        <RichText document={post.content.json} images={images} />
      </Article>
      {post.after && <BlockList data={post.after} />}
      <ContentFooter
        title={next.title}
        subtitle="Go to next post"
        image={next.image.fluid.src}
        to={next.fields.route}
      />
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
