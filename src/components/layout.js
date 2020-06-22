/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import Navigation from "./navigation"
import Footer from "./footer"
import Legal from "./legal"
import "./layout.css"

const renderLink = page => (
  <Link key={page.id} to={`/${page.slug}`}>
    {page.title}
  </Link>
)

const Layout = ({ children, footer }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site: site {
        siteMetadata {
          title
        }
      }
      config: contentfulConfig(title: { eq: "W3" }) {
        footer
        copyright
        cookiePolicy {
          id
          title
          slug
        }
        privacyPolicy {
          id
          title
          slug
        }
        pages {
          id
          title
          slug
        }
        socialMediaChannels {
          id
          title
          url
        }
      }
    }
  `)

  const { site, config } = data

  return (
    <>
      <Navigation pages={config.pages} channels={config.socialMediaChannels} />
      <Header siteTitle={site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        {footer && (
          <Footer
            heading={config.footer}
            links={config.pages.map(page => (
              <Link key={page.id} to={page.slug}>
                {page.title}
              </Link>
            ))}
          >
            <Legal
              copyright={config.copyright}
              links={[
                renderLink(config.cookiePolicy),
                renderLink(config.privacyPolicy),
              ]}
            />
          </Footer>
        )}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
