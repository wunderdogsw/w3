import React from "react"
import HubSpotForm from "react-hubspot-form"

import styles from "./hubspot-form-block.module.css"
import "../styles/hubspot-forms.css"

const HubSpotFormBlock = ({ data }) => (
  <div className={styles.wrapper}>
    <HubSpotForm
      portalId={process.env.GATSBY_HUBSPOT_PORTAL_ID}
      formId={data.formId}
      css=""
    />
  </div>
)

export default HubSpotFormBlock
