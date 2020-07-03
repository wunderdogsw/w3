import React from "react"
import { Helmet } from "react-helmet"

import Facebook from "./facebook"
import LinkedIn from "./linkedin"
import HubSpot from "./hubspot"

const Analytics = () => (
  <Helmet>
    <Facebook />
    <LinkedIn />
    <HubSpot />
  </Helmet>
)

export default Analytics
