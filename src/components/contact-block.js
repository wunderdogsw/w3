import React from "react"
import Image from "gatsby-image"

const ContactBlock = ({ data }) => (
  <>
    <h2 dangerouslySetInnerHTML={{ __html: data.heading }} />
    <Image fluid={data.contact.image.fluid} />
    <h5>{data.contact.name}</h5>
    <p>
      {data.contact.position}
      <br />
      <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
      <br />
      {data.contact.phone}
    </p>
  </>
)

export default ContactBlock
