import React from "react"

import * as styles from "./toggle.module.css"

const Toggle = ({ onClick, active }) => (
    <div
    className={`${styles.wrapper} ${active ? styles.active : ""}`}
    >
        <div
        onClick={onClick}
        className={`${styles.innerWrapper} ${active ? styles.active : ""}`}
        >
            <span />
            <span />
            <span />
        </div>
    </div>
)

export default Toggle
