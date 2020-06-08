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
      posts: allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  content.data.posts.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: { slug: node.slug },
    })
  })
}
