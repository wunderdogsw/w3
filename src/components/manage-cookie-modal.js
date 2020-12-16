import React from "react"
import Modal from "react-modal"
import CookieMultipleCheckbox from "./cookie-multiple-checkbox"
import styles from "./manage-cookie-modal.module.css"
import RichText from "./rich-text"

Modal.setAppElement(`#___gatsby`)

export const ManageCookieModal = ({
  isOpen,
  setOpen,
  content,
  options,
  activate,
}) => {
  const closeModal = () => setOpen(false)

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
        <div className={styles.content}>
          <RichText document={content.json} />
        </div>
        <CookieMultipleCheckbox
          options={options}
          onSubmit={activate}
          closeModalCallback={closeModal}
        />
      </div>
    </Modal>
  )
}
