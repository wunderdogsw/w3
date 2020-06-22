import React from "react"

const ElectronicInvoicing = ({ heading, body }) => (
  <>
    <h2>{heading}</h2>
    <p>
      {body.map((line, index) => (
        <span key={index}>{line}</span>
      ))}
    </p>
  </>
)

export default ElectronicInvoicing
