import React from "react"

import Statistic from "./statistic"

const StatisticsBlock = ({ data }) => (
  <>
    {data.statistics.map(statistic => {
      const { value, description } = statistic

      return (
        <Statistic
          key={`${value}${description}`}
          value={value}
          description={description}
        />
      )
    })}
  </>
)

export default StatisticsBlock
