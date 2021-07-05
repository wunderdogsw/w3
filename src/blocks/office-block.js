import React from "react"

import * as styles from "./office-block.module.css"
import Section from "../components/section"
import Contact from "../components/contact"

const OfficeBlock = ({ data }) => (
  <Section image={data.image}>
    <div className={styles.wrapper}>
      <div>
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
      </div>
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
    </div>
  </Section>
)

export default OfficeBlock
