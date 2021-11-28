import React from 'react'
import { Container } from './style'

import { Navbar, Banner, ArticleFeed } from '../../components'

function Home() {
  return (
    <Container>
      <Navbar />
      <Banner />
      <ArticleFeed />
    </Container>
  )
}

export default Home
