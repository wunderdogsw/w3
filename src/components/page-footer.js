import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Legal from "./legal"

const PageFooter = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulConfig(title: { eq: "W3" }) {
        footer
        pages {
          id
          title
          fields {
            route
          }
        }
      }
    }
  `)

  const config = data.contentfulConfig

  return (
    <footer>
      <h1>{config.footer}</h1>
      <nav>
        {config.pages.map(page => (
          <Link key={page.id} to={page.fields.route}>
            {page.title}
          </Link>
        ))}
      </nav>
      <Legal />
    </footer>
  )
}

export default PageFooter
