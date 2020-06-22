import React from "react"
import Image from "gatsby-image"

import Contact from "./contact"

const OfficeBlock = ({ data }) => (
  <>
    <Image fluid={data.image.fluid} />
    <h2>{data.name}</h2>
    <address>
      {data.streetAddress}
      <br />
      {data.zipCode} {data.city}, {data.country}
      <br />
      Business ID {data.businessId}
      <br />
      <a href={data.googleMapsUrl}>Map</a>
    </address>
    <ul>
      {data.contacts.map(contact => (
        <Contact
          key={contact.id}
          name={contact.name}
          position={contact.position}
          phone={contact.phone}
          email={contact.email}
        />
      ))}
    </ul>
  </>
)

export default OfficeBlock
