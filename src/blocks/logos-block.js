import React from "react"

import styles from "./logos-block.module.css"
import RichText from "../components/rich-text"

const LogosBlock = ({ data }) => (
  <section className={styles.wrapper}>
    <div className={styles.content}>
      <h2>{data.heading}</h2>
      {data.content && <RichText document={data.content} />}
    </div>
    <div className={styles.list}>
      <ul>
        {data.images.map(image => (
          <li key={image.file.url}>
            <img key={image.file.url} src={image.file.url} alt="Logo" />
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default LogosBlock
