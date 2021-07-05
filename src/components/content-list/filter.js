import React from "react"

import * as styles from "./filter.module.css"

const Filter = ({ categories, active, onSelect }) => (
  <ul className={styles.wrapper}>
    {categories.map(category => (
      <li
        key={category}
        className={category === active ? styles.active : ""}
        onClick={() => onSelect(category)}
      >
        {category}
      </li>
    ))}
  </ul>
)

export default Filter
