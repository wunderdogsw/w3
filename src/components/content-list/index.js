import React, { useState } from "react"

import styles from "./index.module.css"
import Filter from "./filter"
import Item from "./item"
import Footer from "./footer"

const ALL = "All"

const findCategories = data => {
  const categoriesSet = new Set()
  data.forEach(item => {
    item.categories.forEach(category => categoriesSet.add(category.title))
  })
  const categories = [...categoriesSet].sort()

  return [ALL, ...categories]
}

const filterContent = (content, activeCategory) => {
  return content.filter(item => {
    if (activeCategory === ALL) return true

    return item.categories
      .map(category => category.title)
      .includes(activeCategory)
  })
}

const ContentList = ({ children, data, filter, render }) => {
  const [activeCategory, setActiveCategory] = useState(ALL)

  return (
    <div className={styles.wrapper}>
      {filter && (
        <Filter
          categories={findCategories(data)}
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
