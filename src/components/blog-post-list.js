import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

import BlogPostCard from "./blog-post-card"
import CategoryFilter from "./category-filter"

const ALL = "All"

const findCategories = posts => {
  const categories = posts.reduce(
    (result, post) => [
      ...result,
      ...post.categories.map(category => category.title),
    ],
    []
  )

  const uniqueCategories = categories.filter(
    (category, index, array) => array.indexOf(category) === index
  )

  return [ALL, ...uniqueCategories.sort()]
}

const filterPosts = (posts, activeCategory) =>
  posts.filter(post => {
    if (activeCategory === ALL) return true

    return post.categories
      .map(category => category.title)
      .includes(activeCategory)
  })

const BlogPostList = () => {
  const [activeCategory, setActiveCategory] = useState("All")

  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedAt, order: DESC }) {
        edges {
          node {
            id
            title
            slug
            author {
              name
            }
            image {
              fluid(maxWidth: 1024) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
            categories {
              title
            }
          }
        }
      }
    }
  `)

  const posts = data.allContentfulBlogPost.edges.map(({ node }) => node)

  return (
    <>
      <CategoryFilter
        categories={findCategories(posts)}
        active={activeCategory}
        onSelect={category => setActiveCategory(category)}
      />
      {filterPosts(posts, activeCategory).map(post => (
        <BlogPostCard
          key={post.id}
          title={post.title}
          authorName={post.author.name}
          image={post.image}
        />
      ))}
    </>
  )
}

export default BlogPostList
