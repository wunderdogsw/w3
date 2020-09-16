import React from "react"
import CookieConsent from "react-cookie-consent"

const CookieConsentBar = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      onAccept={() => {
        window.dataLayer.push({
          event: "cookie_consent",
        })
      }}
    >
      This site uses cookies ...
    </CookieConsent>
  )
}

export default CookieConsentBar
