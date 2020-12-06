import React, { useEffect, useState } from "react"
import CookieConsent, { Cookies } from "react-cookie-consent"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./cookie-consent-bar.module.css"
import CookieMultipleCheckbox from "./cookie-multiple-checkbox"

const CookieConsentBar = () => {
  // Cookie name to check if user have accepted to this before.
  const WD_COOKIE_NAME = "wunderdog_cookie_user_consented"
  const isCookieAccepted = Cookies.get(WD_COOKIE_NAME)

  const [isShow, showCookieBar] = useState(!isCookieAccepted)
  const [isCustomize, showCustomizeOptions] = useState(false)

  const cookieOptions = [
    {
      label: "Necessary",
      checked: true,
      key: "checkboxNecessary",
    },
    {
      label: "Statistics",
      checked: true,
      key: "checkboxStatistics",
    },
    {
      label: "Marketing",
      checked: true,
      key: "checkboxMarketing",
    },
  ]

  const activateCookieOptions = options => {
    if (Array.isArray(options)) {
      options.forEach(option =>
        window.dataLayer.push({
          event: `cookie_consent_${option}`,
        })
      )
    }
  }
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

  return isShow ? (
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
      enableDeclineButton
      buttonText={content.consentApprove}
      hideOnAccept={false}
      hideOnDecline={false}
      setDeclineCookie={false}
      declineButtonText="Advanced settings"
      onDecline={() => showCustomizeOptions(!isCustomize)}
      debug
      onAccept={() => {
        activateCookieOptions(cookieOptions)
      }}
    >
      <span>{content.consentText.consentText}</span>{" "}
      <a href="/privacy">{content.privacyPolicy}</a>
      {isCustomize && (
        <CookieMultipleCheckbox
          options={cookieOptions}
          onSubmit={options => activateCookieOptions(options)}
        />
      )}
    </CookieConsent>
  ) : (
    <button
      className={styles.manageCookies}
      onClick={() => showCookieBar(true)}
    >
      Manage cookies
    </button>
  )
}

export default CookieConsentBar
