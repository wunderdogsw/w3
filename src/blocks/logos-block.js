import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

import * as styles from "./logos-block.module.css"
import RichText from "../components/rich-text"

const LogosBlock = ({ data }) => (
  <section>
    <div className={styles.content}>
      <h2>{data.heading}</h2>
      {data.content && <RichText document={data.content} />}
    </div>
    <div className={styles.list}>
      <ul>
        {data.images.map(image => (
          <li key={image.id}>
            <GatsbyImage
              image={image.gatsbyImageData}
              alt={image.title}
              className={styles.img}
              // override gatsby-image default "cover"
              imgStyle={{ objectFit: "contain" }}
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default LogosBlock
