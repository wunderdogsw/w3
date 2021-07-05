import React, { useState } from "react"

import * as styles from "./index.module.css"
import Filter from "./filter"
import Item from "./item"
import Footer from "./footer"

const ALL = "All"

const getCategories = data => {
  const categoriesSet = new Set()
  data.forEach(item => {
    item.categories.forEach(category => categoriesSet.add(category.title))
  })
  const categories = [...categoriesSet].sort()

  return [ALL, ...categories]
}

const filterContent = (content, activeCategory) => {
  if (activeCategory === ALL) {
    return content
  }

  return content.filter(item =>
    item.categories.some(category => category.title === activeCategory)
  )
}

const ContentList = ({ children, data, filter, render }) => {
  const [activeCategory, setActiveCategory] = useState(ALL)
  const categories = getCategories(data)

  return (
    <div className={styles.wrapper}>
      {filter && (
        <Filter
          categories={categories}
          active={activeCategory}
          onSelect={category => setActiveCategory(category)}
        />
      )}
      <div className={styles.list}>
        {filterContent(data, activeCategory).map(item => (
          <div key={item.id}>{render(item)}</div>
        ))}
        {children}
      </div>
    </div>
  )
}

export default Object.assign(ContentList, { Item, Footer })
