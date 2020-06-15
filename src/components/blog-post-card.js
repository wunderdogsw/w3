import React from "react"
import Image from "gatsby-image"

const BlogPostCard = ({ title, authorName, image }) => (
  <div>
    <Image fluid={image.fluid} />
    <h4>{title}</h4>
    <div>By {authorName}</div>
  </div>
)

export default BlogPostCard
