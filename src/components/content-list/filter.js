import React from "react"

import * as styles from "./filter.module.css"
import PlainButton from "../plain-button"

const Filter = ({ categories, activeCategory, onSelect }) => (
  <ul className={styles.wrapper}>
    {categories.map(category => (
      <li key={category} className={styles.item}>
        <PlainButton
          className={`${styles.btn} ${
            category === activeCategory ? styles.active : ""
          }`}
          onClick={() => onSelect(category)}
        >
          {category}
        </PlainButton>
      </li>
    ))}
  </ul>
)

export default Filter
