/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

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
          }
        }
      }
    }
  `)

  content.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/page.js`),
      context: { slug: node.slug },
    })
  })

  content.data.posts.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: { slug: node.slug },
    })
  })
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
