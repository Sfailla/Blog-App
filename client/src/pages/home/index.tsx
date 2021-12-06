import React from 'react'
import { Container } from './style'

import { Banner, ArticleFeed } from '../../components'

function Home() {
  return (
    <Container>
      <Banner />
      <ArticleFeed />
    </Container>
  )
}

export default Home
