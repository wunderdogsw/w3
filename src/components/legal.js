import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

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
    <>
      {config.copyright}
      <nav>
        {config.policies.map(policy => (
          <Link key={policy.id} to={policy.fields.route}>
            {policy.title}
          </Link>
        ))}
      </nav>
    </>
  )
}

export default Legal
