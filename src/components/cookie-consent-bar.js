import React from "react"
import CookieConsent from "react-cookie-consent"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./cookie-consent-bar.module.css"

const CookieConsentBar = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulCookieConsentBlock {
          edges {
            node {
              privacyPolicy
              consentText {
                consentText
              }
              consentApprove
              consentDecline
            }
          }
        }
      }
    `
  )

  const consents = data.allContentfulCookieConsentBlock.edges.map(node => node)
  const content = consents.length && consents[0].node

  return content ? (
    <CookieConsent
      containerClasses={styles.wrapper}
      contentClasses={styles.content}
      buttonWrapperClasses={styles.buttonWrapper}
      location="bottom"
      acceptOnScroll
      hideOnAccept
      buttonText={content.consentApprove}
      enableDeclineButton
      declineButtonText={content.consentDecline}
      onAccept={() => {
        window.dataLayer.push({
          event: "cookie_consent",
        })
      }}
    >
      <span>{content.consentText.consentText}</span>
      <a href="/privacy">{content.privacyPolicy}</a>
    </CookieConsent>
  ) : null
}

export default CookieConsentBar
