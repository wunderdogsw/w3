import React, { useState } from "react"
import styles from "./cookie-multiple-checkbox.module.css"

const CookieMultipleCheckbox = ({ options, onSubmit }) => {
  const [checkedItems, setCheckedItems] = useState(options)

  const handleChange = event => {
    setCheckedItems(
      checkedItems.map(item =>
        item.label === event.target.name
          ? { ...item, checked: event.target.checked }
          : item
      )
    )
  }

  return (
    <form className={styles.form} onSubmit={() => onSubmit(checkedItems)}>
      {checkedItems.map(item => (
        <div className={styles.checkbox} key={item.key}>
          <label>
            <input
              type="checkbox"
              name={item.label}
              checked={item.checked}
              onChange={handleChange}
            />
            <span>{item.label}</span>
          </label>
        </div>
      ))}
      <button className={styles.saveSetting} type="submit">
        Apply settings
      </button>
    </form>
  )
}

export default CookieMultipleCheckbox
