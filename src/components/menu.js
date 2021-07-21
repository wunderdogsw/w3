import React from "react"
import { useStaticQuery, Link, graphql, navigate } from "gatsby"

import * as styles from "./menu.module.css"

const Menu = ({ active, onLinkClick }) => {
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
  const handleClick = async to => {
    onLinkClick()
    await navigate(to)
  }

  return (
    <div className={`${styles.wrapper} ${active ? styles.active : ""}`}>
      <nav>
        {config.pages.map(page => (
          <Link
            key={page.id}
            to={page.fields.route}
            activeClassName={styles.active}
            onClick={() => handleClick(page.fields.route)}
          >
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
    </div>
  )
}

export default Menu
