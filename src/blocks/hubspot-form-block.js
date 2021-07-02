import React, { useEffect } from "react"
import HubSpotForm from "react-hubspot-form"

import * as styles from "./hubspot-form-block.module.css"
import "../styles/hubspot-forms.css"

const HUBSPOT_FORM_EVENT_TYPE = "hsFormCallback"
const HUBSPOT_FORM_EVENT_FORM_SUBMIT = "onFormSubmit"

const HubSpotFormBlock = ({ data }) => {
  useEffect(() => {
    // Hack from v2, this time in a functional component
    const shouldHandleEvent = event =>
      event.data.type === HUBSPOT_FORM_EVENT_TYPE &&
      event.data.eventName === HUBSPOT_FORM_EVENT_FORM_SUBMIT &&
      event.data.id === data.formId

    const handleSubmitEvent = event => {
      if (shouldHandleEvent(event)) {
        window.dataLayer.push({
          event: "form-submission",
          analyticsLabel: data.gaLabel ? data.gaLabel : data.formId,
        })
      }
    }

    window.addEventListener("message", handleSubmitEvent)

    return () => {
      window.removeEventListener("message", handleSubmitEvent)
    }
  })

  return (
    <div className={styles.wrapper}>
      <HubSpotForm
        portalId={process.env.GATSBY_HUBSPOT_PORTAL_ID}
        formId={data.formId}
        css=""
      />
    </div>
  )
}

export default HubSpotFormBlock
