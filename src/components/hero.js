import React from "react"

import styles from "./hero.module.css"

const Hero = ({ title }) => (
  <header className={styles.wrapper}>
    <h1>{title}</h1>
  </header>
)

export default Hero
