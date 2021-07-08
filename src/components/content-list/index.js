import React, { useEffect, useState } from "react"

import * as styles from "./index.module.css"
import Filter from "./filter"
import Item from "./item"
import Footer from "./footer"

const ALL = "All"

const createDataByCategory = data => {
  const dataByCategory = {}

  data.forEach(item => {
    item.categories.forEach(category => {
      if (!(category.title in dataByCategory)) {
        dataByCategory[category.title] = []
      }

      dataByCategory[category.title].push(item)
    })
  })

  return dataByCategory
}

const ContentList = ({ children, data, filter, render }) => {
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [filteredData, setFilteredData] = useState(data)
  const dataByCategory = createDataByCategory(data)
  const categories = [ALL, ...Object.keys(dataByCategory).sort()]

  useEffect(() => {
    if (activeCategory === ALL) {
      setFilteredData(data)
    } else {
      setFilteredData(dataByCategory[activeCategory])
    }
  }, [activeCategory, data, dataByCategory])

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
        {filteredData.map(item => (
          <div key={item.id}>{render(item)}</div>
        ))}
        {children}
      </div>
    </div>
  )
}

export default Object.assign(ContentList, { Item, Footer })
