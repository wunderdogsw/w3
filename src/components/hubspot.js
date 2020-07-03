import React from "react"

const HubSpot = () => (
  <script
    type="text/javascript"
    id="hs-script-loader"
    async
    defer
    src={process.env.GATSBY_HUBSPOT_SCRIPT}
  ></script>
)

export default HubSpot
