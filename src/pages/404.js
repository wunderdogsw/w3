import React from "react"

import * as styles from "./404.module.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PageFooter from "../components/page-footer"

const NotFoundPage = () => (
  <Layout footer={<PageFooter />}>
    <SEO title="404: Not found" />
    <header className={styles.wrapper}>
      <div className={styles.shrug} />
      <h1>404</h1>
      <div>Content not found</div>
    </header>
  </Layout>
)

export default NotFoundPage
