import React from "react"
import { Link as GatsbyLink } from "gatsby"

const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
  const isInternal = /^\/(?!\/)/.test(to)

  if (isInternal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={to} {...other} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export default Link
