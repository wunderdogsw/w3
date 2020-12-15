import React, { useEffect, useState } from "react"
import CookieConsent, { Cookies } from "react-cookie-consent"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./cookie-consent-bar.module.css"
import { ManageCookieModal } from "./manage-cookie-modal"

const CookieConsentBar = () => {
  // Cookie name to check if user have accepted to this before.
  const WD_COOKIE_NAME = "wunderdog_cookie_user_consented"
  const isCookieAccepted = Cookies.get(WD_COOKIE_NAME)
  const [isShow, showCookieBar] = useState(!isCookieAccepted)
  const [isModalOpen, openModal] = useState(false)
  /**
   * Only activate GTM automatically when needed. (dataLayer doesnt contain cookie_consent)
   */
  const activateGTM = () => {
    const GTMLayer = window.dataLayer.find(
      layer => layer.event && layer.event.includes("cookie_consent")
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
  })

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

  return (
    <>
      <ManageCookieModal isOpen={isModalOpen} setOpen={openModal} />
      {isShow ? (
        <CookieConsent
          containerClasses={styles.wrapper}
          contentClasses={styles.content}
          buttonWrapperClasses={styles.buttonWrapper}
          cookieName={WD_COOKIE_NAME}
          // Cookie will auto expire after 2 year as we promised to user.
          expires={730}
          cookieValue={true}
          location="bottom"
          sameSite="strict"
          hideOnAccept={false}
          hideOnDecline={false}
          debug
          buttonText={content.consentApprove}
          enableDeclineButton
          onDecline={() => {
            openModal(true)
            showCookieBar(false)
          }}
          declineButtonText="Manage settings"
          onAccept={() => {
            showCookieBar(false)
          }}
        >
          <span>{content.consentText.consentText}</span>
          <a href="/privacy">{content.privacyPolicy}</a>
        </CookieConsent>
      ) : (
        <button
          className={styles.manageCookies}
          onClick={() => openModal(true)}
        >
          Manage cookies
        </button>
      )}
    </>
  )
}

export default CookieConsentBar
