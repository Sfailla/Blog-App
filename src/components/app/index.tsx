import React from 'react'
import { Container } from './style'
import { Homepage, Signup } from '../../pages'
import { Navbar } from '../../components'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App(): React.ReactElement {
  return (
    <Container>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
