import React from "react"

import Hero from "./hero"
import Header from "./header"

const HeaderBlock = ({ data }) => {
  if (data.hero) {
    return <Hero title={data.title} />
  }

  return <Header title={data.title} subtitle={data.subtitle} />
}

export default HeaderBlock
