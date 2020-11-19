import React from "react"

const TableBlock = ({ data }) => {
  console.log(data)

  const renderHeadingRow = headingRow => {
    return (
      <tr>
        {headingRow.map(colContent => (
          <th>{colContent}</th>
        ))}
      </tr>
    )
  }

  const renderRow = row => {
    return (
      <tr>
        {row.map(colContent => (
          <td>{colContent}</td>
        ))}
      </tr>
    )
  }

  return (
    <table>
      {data.table.tableData.map((tableRow, index) => {
        if (index === 0) {
          renderHeadingRow(tableRow)
        }

        return renderRow(tableRow)
      })}
    </table>
  )
}

export default TableBlock
