import React from "react"

const Footer = ({ children, heading, links }) => (
  <footer>
    <h1>{heading}</h1>
    <nav>{links}</nav>
    {children}
  </footer>
)

export default Footer
