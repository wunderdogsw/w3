import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"

const BLOG = "blog"

const BlogPostCard = ({ title, slug, authorName, image }) => (
  <Link to={`/${BLOG}/${slug}`}>
    <Image fluid={image.fluid} />
    <h4>{title}</h4>
    <div>By {authorName}</div>
  </Link>
)

export default BlogPostCard
