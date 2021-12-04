import React, { ReactElement } from 'react'
import { Container } from './style'
import { Homepage, SignUp, SignIn } from '../../pages'
import { Navbar } from '../../components'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App(): ReactElement {
  return (
    <Container>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
