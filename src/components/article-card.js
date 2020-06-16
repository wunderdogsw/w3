import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"

const ArticleCard = ({ to, title, subtitle, image }) => (
  <Link to={to}>
    <Image fluid={image.fluid} />
    <h4>{title}</h4>
    <div>{subtitle}</div>
  </Link>
)

export default ArticleCard
