/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

const findImageURLs = content => {
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
          }
        }
      }
      posts: allContentfulBlogPost {
        edges {
          node {
            slug
            content {
              json
            }
          }
        }
      }
      stories: allContentfulCaseStory {
        edges {
          node {
            slug
            content {
              json
            }
          }
        }
      }
    }
  `)

  const createPagesFromData = (data, template, segment) => {
    data.edges.forEach(({ node }) => {
      const context = { slug: node.slug }
      if (node.content) {
        context.images = findImageURLs(node.content.json.content)
      }

      createPage({
        path: `${segment ? `${segment}/` : ``}${node.slug}`,
        component: path.resolve(`./src/templates/${template}`),
        context,
      })
    })
  }

  createPagesFromData(content.data.pages, "page.js")
  createPagesFromData(content.data.posts, "blog-post.js", "blog")
  createPagesFromData(content.data.stories, "case-story.js", "work")
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type contentfulComponentBlockOptionsJsonNode implements Node {
      internal: Internal
    }

    type ContentfulComponentBlock implements Node {
      options: contentfulComponentBlockOptionsJsonNode
    }
  `

  createTypes(typeDefs)
}
