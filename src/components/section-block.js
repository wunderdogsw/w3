import React from "react"
import Image from "gatsby-image"

import RichText from "./rich-text"

const renderImage = image => <Image fluid={image.fluid} />

const SectionBlock = ({ data }) => (
  <section>
    {data.image && renderImage(data.image)}
    <h2>{data.heading}</h2>
    <RichText document={data.content.json} />
  </section>
)

export default SectionBlock
