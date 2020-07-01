/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

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
      value: `/blog/${node.slug}`,
    })
  }

  if (node.internal.type === "ContentfulCaseStory") {
    createNodeField({
      node,
      name: "route",
      value: `/work/${node.slug}`,
    })
  }
}

const findImageURLs = content => {
  if (!content) {
    return []
  }

  const isAsset = entry => entry.nodeType === "embedded-asset-block"

  return content.reduce((result, entry) => {
    if (
      !entry.data ||
      !entry.data.target ||
      !entry.data.target.fields ||
      !entry.data.target.fields.file
    ) {
      return result
    }

    const { url } = entry.data.target.fields.file["en-US"]
    if (isAsset(entry) && url) {
      return [...result, url]
    }

    return result
  }, [])
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
              json
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
              json
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
              json
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
      images: findImageURLs(node.content && node.content.json.content),
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

    type ContentfulComponentBlockOptionsJsonNode implements Node {
      internal: Internal
    }

    type ContentfulComponentBlock implements Node {
      options: ContentfulComponentBlockOptionsJsonNode
    }

    type ContentfulBlogPost implements Node {
      after: [ContentfulContactBlock]
      before: [ContentfulContactBlock]
    }

    type ContentfulCaseStoryContentRichTextNode {
      json: JSON
    }

    type ContentfulCaseStory implements Node {
      content: ContentfulCaseStoryContentRichTextNode
    }
  `

  createTypes(typeDefs)
}
