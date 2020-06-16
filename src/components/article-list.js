import React, { useState } from "react"

import CategoryFilter from "./category-filter"

const ALL = "All"

const findCategories = data => {
  const categories = data.reduce(
    (result, item) => [
      ...result,
      ...item.categories.map(category => category.title),
    ],
    []
  )

  const uniqueCategories = categories.filter(
    (category, index, array) => array.indexOf(category) === index
  )

  return [ALL, ...uniqueCategories.sort()]
}

const filterArticles = (articles, activeCategory) => {
  return articles.filter(article => {
    if (activeCategory === ALL) return true

    return article.categories
      .map(category => category.title)
      .includes(activeCategory)
  })
}

const ArticleList = ({ data, render }) => {
  const [activeCategory, setActiveCategory] = useState(ALL)

  return (
    <>
      <CategoryFilter
        categories={findCategories(data)}
        active={activeCategory}
        onSelect={category => setActiveCategory(category)}
      />
      {filterArticles(data, activeCategory).map(article => render(article))}
    </>
  )
}

export default ArticleList
