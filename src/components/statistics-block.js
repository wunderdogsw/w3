import React from "react"

import Statistic from "./statistic"

const StatisticsBlock = ({ data }) => (
  <>
    {data.map(statistic => {
      const { title, value, description } = statistic.fields

      return (
        <Statistic
          key={title["en-US"]}
          value={value["en-US"]}
          description={description["en-US"]}
        />
      )
    })}
  </>
)

export default StatisticsBlock
