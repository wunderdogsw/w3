import React from "react"

const ElectronicInvoicing = ({ heading, body }) => (
  <>
    <h2>{heading}</h2>
    <p>
      {body.map((line, index) => (
        <>
          {index !== 0 && <br />}
          {line}
        </>
      ))}
    </p>
  </>
)

export default ElectronicInvoicing
