import React from "react"

import * as styles from "./plain-button.module.css"

// button with clean style for accessibility use:
// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md#case-i-understand-the-previous-cases-but-still-need-an-element-resembling-a-link-that-is-purely-clickable
const PlainButton = ({ className, children, ...otherProps }) => {
  return (
    <button className={`${styles.btn} ${className}`} {...otherProps}>
      {children}
    </button>
  )
}

export default PlainButton
