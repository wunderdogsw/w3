/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import "./layout.css"
import Analytics from "./analytics"
import Navbar from "./navbar"

if (process.env.DISABLE_FONTS !== "true") {
  require("../../fonts/index.css")
}

const Layout = ({ children, footer }) => {
  return (
    <>
      <Analytics />
      <Navbar />
      <main>{children}</main>
      {footer}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
