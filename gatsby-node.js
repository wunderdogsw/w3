/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

const routes = require("./src/common/routes")

const INDEX = "index"

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "ContentfulPage") {
    createNodeField({
      node,
      name: "route",
      value: node.slug === INDEX ? "/" : `/${node.slug}`,
    })
  }

  if (node.internal.type === "ContentfulBlogPost") {
    createNodeField({
      node,
      name: "route",
      value: `${routes.BLOG_POST_INDEX}/${node.slug}`,
    })
  }

  if (node.internal.type === "ContentfulCaseStory") {
    createNodeField({
      node,
      name: "route",
      value: `${routes.CASE_STORY_INDEX}/${node.slug}`,
    })
  }
}

const findImageURLs = references => {
  if (!references) {
    return []
  }
  const filtered = references.filter(
    ref =>
      ref.sys &&
      ref.sys.type === "Asset" &&
      ref.file &&
      ref.file.contentType.match(/^image\/.+$/i)
  )
  return filtered.map(ref => ref.file.url)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const content = await graphql(`
    query {
      pages: allContentfulPage {
        edges {
          node {
            slug
            content {
              raw
              references {
                id
                contentful_id
                sys {
                  type
                }
              }
            }
            fields {
              route
            }
          }
        }
      }
      posts: allContentfulBlogPost(sort: { fields: publishedAt, order: DESC }) {
        edges {
          node {
            slug
            content {
              raw
              references {
                ... on ContentfulAsset {
                  id
                  contentful_id
                  title
                  file {
                    contentType
                    url
                  }
                  sys {
                    type
                  }
                }
                ... on ContentfulHubSpotFormBlock {
                  id
                  contentful_id
                  sys {
                    type
                  }
                }
                ... on ContentfulHyperlinkButtonBlock {
                  id
                  contentful_id
                  sys {
                    type
                  }
                }
              }
            }
            fields {
              route
            }
          }
        }
      }
      stories: allContentfulCaseStory(
        sort: { fields: publishedAt, order: DESC }
      ) {
        edges {
          node {
            slug
            content {
              raw
            }
            fields {
              route
            }
          }
        }
      }
    }
  `)

  const addPage = (node, template, context) => {
    const pageContext = {
      ...context,
      slug: node.slug,
      images: findImageURLs(node.content && node.content.references),
    }

    createPage({
      path: node.fields.route,
      component: path.resolve(`./src/templates/${template}`),
      context: pageContext,
    })
  }

  const addPages = (data, template) => {
    const { edges } = data

    edges.forEach(({ node }) => addPage(node, template))
  }

  const addContentPages = (data, template) => {
    const { edges } = data

    edges.forEach(({ node }, index) => {
      const next = index + 1 < edges.length ? edges[index + 1] : edges[0]

      addPage(node, template, { next: next.node.slug })
    })
  }

  addPages(content.data.pages, "page.js")
  addContentPages(content.data.posts, "blog-post.js")
  addContentPages(content.data.stories, "case-story.js")
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type ContentfulHeaderBlock implements Node {
      subtitle: String
    }

    type ContentfulBlogPost implements Node {
      video: ContentfulAsset
    }

    type ContentfulCaseStory implements Node {
      video: ContentfulAsset
    }

    type ContentfulCaseStoryContentRichTextNode {
      raw: JSON
    }

    type ContentfulCaseStory implements Node {
      content: ContentfulCaseStoryContentRichTextNode
    }
  `

  createTypes(typeDefs)
}
