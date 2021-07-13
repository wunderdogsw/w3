import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Logo from "./logo"
import Toggle from "./toggle"
import Menu from "./menu"
import * as styles from "./navbar.module.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoHidden, setLogoHidden] = useState(false)

  useEffect(() => {
    const toggleLogo = () => setLogoHidden(window.scrollY > 20)
    const hideMenu = () => setMenuOpen(false)

    window.addEventListener("scroll", toggleLogo)
    window.addEventListener("resize", hideMenu)

    return () => {
      window.removeEventListener("scroll", toggleLogo)
      window.removeEventListener("resize", hideMenu)
    }
  }, [])

  return (
    <>
      <header className={styles.wrapper}>
        <Link
          to="/"
          aria-label="Wunderdog home"
          className={`${styles.logo} ${
            logoHidden && !menuOpen ? styles.hidden : ""
          }`}
        >
          <Logo inverse={menuOpen} />
        </Link>
        <Toggle onClick={() => setMenuOpen(!menuOpen)} active={menuOpen} />
      </header>
      <Menu active={menuOpen} />
    </>
  )
}

export default Navbar
