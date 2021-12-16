import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ArticlesPage, SignUp, SignIn } from '../../pages'

export default function UnauthenticatedApp(): ReactElement {
  return (
    <div>
      <AppRoutes />
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  )
}
