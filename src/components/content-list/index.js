import React, { useEffect, useState } from "react"

import Filter from "./filter"
import Item from "./item"
import Footer from "./footer"
import * as styles from "./index.module.css"

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
  const [dataByCategory, setDataByCategory] = useState({})
  const categories = [ALL, ...Object.keys(dataByCategory).sort()]

  useEffect(() => {
    setDataByCategory(createDataByCategory(data))
  }, [data])

  useEffect(() => {
    const newFilteredData =
      activeCategory === ALL ? data : dataByCategory[activeCategory]
    setFilteredData(newFilteredData)
  }, [data, dataByCategory, activeCategory])

  return (
    <div className={styles.wrapper}>
      {filter && (
        <Filter
          categories={categories}
          activeCategory={activeCategory}
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
