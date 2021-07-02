import React from "react"

import * as styles from "./electronic-invoicing.module.css"

const ElectronicInvoicing = ({ heading, body }) => (
  <div className={styles.wrapper}>
    <h2>{heading}</h2>
    <p>
      {body.map((line, index) => (
        <span key={index}>{line}</span>
      ))}
    </p>
  </div>
)

export default ElectronicInvoicing
