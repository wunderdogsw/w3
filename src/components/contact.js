import React from "react"

const Contact = ({ name, position, phone, email }) => (
  <li>
    <h5>{name}</h5>
    <p>
      {position}
      <br />
      {phone}
      <br />
      <a href={`mailto:${email}`}>{email}</a>
    </p>
  </li>
)

export default Contact
