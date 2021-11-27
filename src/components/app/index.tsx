import React from 'react'
import { Container } from './style'
import { Navbar } from '../'
import { Banner } from '../'

function App(): React.ReactElement {
  return (
    <Container>
      <Navbar />
      <Banner />
    </Container>
  )
}

export default App
