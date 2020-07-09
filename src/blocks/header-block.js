import React from "react"

import Hero from "../components/hero"
import Header from "../components/header"

const HeaderBlock = ({ data }) => {
  if (data.hero) {
    return <Hero title={data.title} />
  }

  return (
    <Header title={data.title} subtitle={data.subtitle} image={data.image} />
  )
}

export default HeaderBlock
