import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import * as styles from "./page-footer.module.css"
import Legal from "./legal"
import Logo from "./logo"

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
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo inverse />
      </div>
      <h1>{config.footer}</h1>
      <nav>
        {config.pages.map(page => (
          <Link
            key={page.id}
            to={page.fields.route}
            activeClassName={styles.active}
          >
            {page.title}
          </Link>
        ))}
      </nav>
      <Legal />
    </div>
  )
}

export default PageFooter
