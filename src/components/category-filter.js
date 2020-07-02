import React from "react"

import styles from "./category-filter.module.css"

const CategoryFilter = ({ categories, active, onSelect }) => (
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

export default CategoryFilter
