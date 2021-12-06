import React from 'react'
import { render } from '@testing-library/react'
import App from '.'

test('renders app', () => {
  const app = render(<App />)
  expect(app).toBeTruthy()
})
