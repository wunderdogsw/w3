import React, { useState } from "react"
import { Link } from "gatsby"

import styles from "./navbar.module.css"
import Logo from "./logo"
import Toggle from "./toggle"
import Menu from "./menu"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          <Logo inverse={menuOpen} />
        </Link>
        <Toggle onClick={() => setMenuOpen(!menuOpen)} active={menuOpen} />
      </header>
      <Menu active={menuOpen} />
    </>
  )
}

export default Navbar
