import React from "react"

import RichText from "./rich-text"

const ArticleBlock = ({ data }) => (
  <>
    <RichText document={data.content.json} />
  </>
)

export default ArticleBlock
