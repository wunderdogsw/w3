import React from "react"
import Modal from "react-modal"
import CookieMultipleCheckbox from "./cookie-multiple-checkbox"
import styles from "./manage-cookie-modal.module.css"

export const ManageCookieModal = ({ isOpen, setOpen }) => {
  const closeModal = () => setOpen(false)
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

  return (
    <Modal
      className={styles.wrapper}
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.heading}>
        <button className={styles.closeModal} onClick={closeModal}>
          +
        </button>
      </div>
      <div className={styles.body}>
        <CookieMultipleCheckbox
          options={cookieOptions}
          onSubmit={activateCookieOptions}
        />
      </div>
    </Modal>
  )
}
