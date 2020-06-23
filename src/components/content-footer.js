import React from "react"
import { Link } from "gatsby"

import Legal from "./legal"

const ContentFooter = ({ title, subtitle, to }) => (
  <footer>
    <Link to={to}>
      <div>{subtitle}</div>
      <h1>{title}</h1>
    </Link>
    <Legal />
  </footer>
)

export default ContentFooter
