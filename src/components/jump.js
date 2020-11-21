import React, { useState, useEffect } from "react"

import styles from "./jump.module.css"

const Jump = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const [timer, setTimer] = useState(null)

  const cleanup = () => {
    window.removeEventListener("scroll", show)
    clearTimeout(timer)
  }

  const show = () => {
    setVisible(true)
    cleanup()
  }

  useEffect(() => {
    window.addEventListener("scroll", show)

    if (window.innerHeight > 1440) {
      show()
    } else {
      setTimer(
        setTimeout(() => {
          show()
        }, 500)
      )
    }

    return cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${styles.wrapper} ${visible ? styles.visible : ""}`}>
      {children}
    </div>
  )
}

export default Jump
