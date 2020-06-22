import React from "react"
import { Link } from "gatsby"

const Navigation = ({ pages, channels }) => {
  return (
    <>
      <nav>
        {pages.map(page => (
          <Link key={page.id} to={`/${page.slug}`}>
            {page.title}
          </Link>
        ))}
      </nav>
      <nav>
        {channels.map(channel => (
          <a key={channel.id} href={channel.url}>
            {channel.title}
          </a>
        ))}
      </nav>
    </>
  )
}

export default Navigation
