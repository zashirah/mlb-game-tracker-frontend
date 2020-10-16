import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import GameContainer from "../container/GameContainer"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GameContainer />
  </Layout>
)

export default IndexPage
