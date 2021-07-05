import React from "react"
import Image from "gatsby-image"

import styles from "./logos-block.module.css"
import RichText from "../components/rich-text"

const LogosBlock = ({ data }) => (
  <section>
    <div className={styles.content}>
      <h2>{data.heading}</h2>
      {data.content && <RichText document={data.content.json} />}
    </div>
    <div className={styles.list}>
      <ul>
        {data.images.map(image => (
          <li key={image.id}>
            <Image
              alt={image.title}
              className={styles.img}
              imgStyle={{ objectFit: "contain" }} // override gatsby-image default "cover"
              fluid={image.fluid}
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default LogosBlock
