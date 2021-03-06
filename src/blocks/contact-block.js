import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

import * as styles from "./contact-block.module.css"

const ContactBlock = ({ data }) => (
  <div className={styles.wrapper}>
    <h2 dangerouslySetInnerHTML={{ __html: data.heading }} />
    <div>
      <GatsbyImage
        image={data.contact.image.gatsbyImageData}
        alt={data.contact.image.title}
      />
      <div>
        <h3 className={styles.title}>{data.contact.name}</h3>
        <p>
          {data.contact.position}
          <br />
          <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
          <br />
          {data.contact.phone}
        </p>
      </div>
    </div>
  </div>
)

export default ContactBlock
