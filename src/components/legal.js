import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import styles from "./legal.module.css"

const Legal = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulConfig(title: { eq: "W3" }) {
        copyright
        policies {
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
      <nav>
        {config.policies.map(policy => (
          <Link key={policy.id} to={policy.fields.route}>
            {policy.title}
          </Link>
        ))}
      </nav>
      <div>{config.copyright}</div>
    </div>
  )
}

export default Legal
