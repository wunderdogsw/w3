import React from "react"

import Header from "../components/header"
import Hero from "../components/hero"

const HeaderBlock = ({ data }) => {
  if (data.hero) {
    return <Hero title={data.title} />
  }

  return (
    <Header title={data.title} subtitle={data.subtitle} image={data.image} />
  )
}

export default HeaderBlock
