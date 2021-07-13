/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Navbar from "./navbar"
import CookieConsentBar from "./cookie-consent-bar"
import "./layout.css"

if (process.env.GATSBY_ENABLE_FONTS === "true") {
  require("../../fonts/index.css")
}

const Layout = ({ children, footer }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {footer}
      <CookieConsentBar />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
