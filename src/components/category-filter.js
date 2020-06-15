import React from "react"

const CategoryFilter = ({ categories, active, onSelect }) => (
  <ul>
    {categories.map(category => (
      <li
        style={{ color: category === active ? "gray" : "black" }}
        onClick={() => onSelect(category)}
      >
        {category}
      </li>
    ))}
  </ul>
)

export default CategoryFilter
