import React from "react"
import RichText from "./rich-text"

const LogosBlock = ({ data }) => {
  console.log(data.images)

  return (
    <section>
      <h2>{data.heading}</h2>
      {data.content && <RichText document={data.content.json} />}
      {data.images.map(image => (
        <img key={image.file.url} src={image.file.url} />
      ))}
    </section>
  )
}

export default LogosBlock
