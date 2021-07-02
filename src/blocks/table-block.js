import React from "react"
import * as styles from "./table-block.module.css"

const TableBlock = ({ data }) => {
  const renderColumnContent = content => {
    const urlRegex = new RegExp(
      /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/
    )

    // TODO: Replace this with proper embedded RichText embed Link functionality
    if (urlRegex.test(content)) {
      return <a href={content}>Visit link</a>
    }

    return content
  }

  const renderHeadingRow = headingRow => {
    return (
      <thead>
        <tr>
          {headingRow.map((colContent, index) => (
            <th key={index}>{colContent}</th>
          ))}
        </tr>
      </thead>
    )
  }

  const renderRow = (row, rowIndex) => {
    return (
      <tr key={rowIndex} valign="top">
        {row.map((colContent, index) => (
          <td key={index}>{renderColumnContent(colContent)}</td>
        ))}
      </tr>
    )
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.wrapper}>
        {renderHeadingRow(data.table.tableData[0])}
        <tbody>
          {data.table.tableData
            .filter((row, index) => index !== 0)
            .map((row, index) => renderRow(row, index))}
        </tbody>
      </table>
    </div>
  )
}

export default TableBlock
