import React from "react"

import styles from "./statistics-block.module.css"
import Statistic from "../components/statistic"

const StatisticsBlock = ({ data }) => (
  <div className={styles.wrapper}>
    {data.statistics.map(statistic => {
      const { id, value, description } = statistic

      return <Statistic key={id} value={value} description={description} />
    })}
  </div>
)

export default StatisticsBlock
