import React, { useState } from "react"
import * as styles from "./cookie-multiple-checkbox.module.css"

const CookieMultipleCheckbox = ({ options, onSubmit }) => {
  const [checkedItems, setCheckedItems] = useState(options)
  const handleFormSubmit = e => {
    e.preventDefault()
    onSubmit(checkedItems)
    window.location.reload()
  }
  const handleChange = event => {
    setCheckedItems(
      checkedItems.map(item =>
        item.value === event.target.name
          ? { ...item, checked: event.target.checked }
          : item
      )
    )
  }

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      {checkedItems.map(item => (
        <div className={styles.checkbox} key={`checkbox${item.value}`}>
          <label>
            <input
              type="checkbox"
              className={styles.switch}
              name={item.value}
              checked={item.checked}
              onChange={handleChange}
            />
            <span>{item.value}</span>
          </label>
        </div>
      ))}
      <button className={styles.saveSetting} type="submit">
        Apply settings
        {/* TODO: Make me as part of Contentful config so i can be translated */}
      </button>
    </form>
  )
}

export default CookieMultipleCheckbox
