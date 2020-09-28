import React, { useEffect } from "react"
import CookieConsent, { Cookies } from "react-cookie-consent"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./cookie-consent-bar.module.css"

const CookieConsentBar = () => {
  // Cookie name to check if user have accepted to this before.
  const WD_COOKIE_NAME = "wunderdog_cookie_user_consented"
  const isCookieAccepted = Cookies.get(WD_COOKIE_NAME)

  /**
   * Only activate GTM automatically when needed. (dataLayer doesnt contain cookie_consent)
   */
  const activateGTM = () => {
    const GTMLayer = window.dataLayer.find(
      layer => layer.event && layer.event === "cookie_consent"
    )

    const GTMLoaded = Boolean(GTMLayer)

    if (isCookieAccepted && !GTMLoaded) {
      // Auto-activate GTM if user have accept this before
      window.dataLayer.push({
        event: "cookie_consent",
      })
    }
  }

  // Auto-activate GTM if user have approved consent before and comeback
  useEffect(() => {
    activateGTM()
  }, [])

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

  // Only show cookie bar if content exist and user havent consent to cookie before
  const shouldShouldCookieBar = Boolean(content) && !isCookieAccepted

  return shouldShouldCookieBar ? (
    <CookieConsent
      containerClasses={styles.wrapper}
      contentClasses={styles.content}
      buttonWrapperClasses={styles.buttonWrapper}
      cookieName={WD_COOKIE_NAME}
      cookieValue={true}
      location="bottom"
      acceptOnScroll
      sameSite="Secure"
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
