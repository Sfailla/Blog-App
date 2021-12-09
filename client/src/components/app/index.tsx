import React, { ReactElement } from 'react'
import { Container } from './style'
import { ArticlesPage, SignUp, SignIn } from '../../pages'
import { Navbar } from '../../components'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App(): ReactElement {
  return (
    <Container>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </Container>
  )
}
