import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

const Navigation = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulConfig(title: { eq: "W3" }) {
        pages {
          id
          title
          fields {
            route
          }
        }
        socialMediaChannels {
          id
          title
          url
        }
      }
    }
  `)

  const config = data.contentfulConfig

  return (
    <>
      <nav>
        {config.pages.map(page => (
          <Link key={page.id} to={page.fields.route}>
            {page.title}
          </Link>
        ))}
      </nav>
      <nav>
        {config.socialMediaChannels.map(channel => (
          <a key={channel.id} href={channel.url}>
            {channel.title}
          </a>
        ))}
      </nav>
    </>
  )
}

export default Navigation
