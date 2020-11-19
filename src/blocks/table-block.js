import React from "react"
import styles from "./table-block.module.css"

const TableBlock = ({ data }) => {
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
      <tr valign="top">
        {row.map(colContent => (
          <td>{colContent}</td>
        ))}
      </tr>
    )
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.wrapper}>
        {data.table.tableData.map((tableRow, index) => {
          if (index === 0) {
            return renderHeadingRow(tableRow)
          }

          return renderRow(tableRow)
        })}
      </table>
    </div>
  )
}

export default TableBlock
