import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

import * as styles from "./menu.module.css"

const Menu = ({ active, toggleMenu }) => {
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

  const handleClick = to => {
    const regexp = new RegExp(`${to}/?$`)
    const hasClickedCurrentPage = window.location.href.match(regexp)
    if (hasClickedCurrentPage) {
      toggleMenu()
    }
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
