import React from "react"

import Statistic from "./statistic"

const StatisticsBlock = ({ data }) => (
  <>
    {data.statistics.map(statistic => {
      const { id, value, description } = statistic

      return <Statistic key={id} value={value} description={description} />
    })}
  </>
)

export default StatisticsBlock
