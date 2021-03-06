import React, { useEffect, useState } from "react"
import CookieConsent, { Cookies } from "react-cookie-consent"
import { useStaticQuery, graphql } from "gatsby"
import * as styles from "./cookie-consent-bar.module.css"
import { ManageCookieModal } from "./manage-cookie-modal"

const defaultCookieOptions = [
  {
    checked: true,
    value: "necessary",
  },
  {
    checked: false,
    value: "statistic",
  },
  {
    checked: false,
    value: "marketing",
  },
]

const agreeAllCookieOptions = [
  {
    checked: true,
    value: "necessary",
  },
  {
    checked: true,
    value: "statistic",
  },
  {
    checked: true,
    value: "marketing",
  },
]

const CookieConsentBar = () => {
  // Cookie name to check if user have accepted to this before.
  const WD_COOKIE_NAME = "wunderdog_cookie_user_consented"
  // Statistics cookie is singeled out so GTM can read it more easily
  const STATISTICS_STATUS = "wunderdog_statistics_consent"
  const cookieValue = Cookies.get(WD_COOKIE_NAME)
  const consentedCookie = cookieValue && typeof cookieValue === "string"

  const [userConsented, hideCookieBar] = useState(Boolean(consentedCookie))
  const [isModalOpen, openModal] = useState(false)
  const [cookieOptions, setCookieOptions] = useState(defaultCookieOptions)

  /**
   * Activate GTM layer base on options
   * @param {*} options
   */
  const activateCookieOptions = options => {
    if (Array.isArray(options)) {
      // Apply new layers
      options.forEach(option => {
        if (option.checked) {
          window.dataLayer.push({
            event: `cookie_consent_${option.value}`,
          })
        }

        if (option.value === "statistic") {
          Cookies.set(STATISTICS_STATUS, option.checked, { expires: 730 })
        }
      })

      // Update local state, in case user want to choose again
      setCookieOptions(options)

      // Save cookies, persist for 2 years
      Cookies.set(WD_COOKIE_NAME, JSON.stringify(options), { expires: 730 })
    }
  }

  // Auto-activate GTM if user have approved consent before and comeback
  useEffect(() => {
    /**
     * Only activate GTM automatically when needed. (dataLayer doesnt contain cookie_consent)
     */
    const activateGTM = () => {
      const GTMLayer = window.dataLayer.find(
        layer => layer.event && layer.event.includes("cookie_consent_")
      )

      const GTMLoaded = Boolean(GTMLayer)

      if (consentedCookie && !GTMLoaded) {
        try {
          // Get saved cookie options from cookie value
          const restoredOptions = JSON.parse(cookieValue)
          // Auto-activate GTM if user have accept this before, using data from saved cookie
          // Previous implementation of cookie have value as boolean, revisit-user who agreed should get their cookie updated
          if (typeof restoredOptions === "boolean") {
            activateCookieOptions(
              restoredOptions ? agreeAllCookieOptions : defaultCookieOptions
            )
          } else activateCookieOptions(restoredOptions)
        } catch (e) {
          Cookies.remove(WD_COOKIE_NAME)
          console.warn("Invalid cookie, maybe old implemented cookie")
        }
      }
    }
    activateGTM()
  }, [consentedCookie, cookieValue])

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
              manageCookieText
              modalContent {
                raw
              }
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
      <ManageCookieModal
        options={cookieOptions}
        isOpen={isModalOpen}
        setOpen={openModal}
        content={content.modalContent}
        activate={activateCookieOptions}
      />
      {userConsented ? (
        <button
          className={styles.manageCookies}
          onClick={() => openModal(true)}
        >
          {content.manageCookieText}
        </button>
      ) : (
        <CookieConsent
          containerClasses={styles.wrapper}
          contentClasses={styles.content}
          buttonWrapperClasses={styles.buttonWrapper}
          location="bottom"
          sameSite="strict"
          hideOnAccept={false}
          hideOnDecline={false}
          debug
          buttonText={content.consentApprove}
          enableDeclineButton
          onDecline={() => {
            openModal(true)
            hideCookieBar(true)
          }}
          declineButtonText={content.manageCookieText}
          onAccept={() => {
            activateCookieOptions(agreeAllCookieOptions)
            hideCookieBar(true)
          }}
        >
          <span>{content.consentText.consentText}</span>{" "}
          <a href="/privacy">{content.privacyPolicy}</a>
        </CookieConsent>
      )}
    </>
  )
}

export default CookieConsentBar
