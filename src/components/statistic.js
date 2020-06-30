import React from "react"

import styles from "./statistic.module.css"

const Statistic = ({ value, description }) => (
  <div className={styles.wrapper}>
    <div>{value}</div>
    <div>{description}</div>
  </div>
)

export default Statistic
