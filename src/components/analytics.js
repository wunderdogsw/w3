import React from "react"
import { Helmet } from "react-helmet"

import Facebook from "./facebook"
import LinkedIn from "./linkedin"

const Analytics = () => (
  <Helmet>
    <Facebook />
    <LinkedIn />
  </Helmet>
)

export default Analytics
