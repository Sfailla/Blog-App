import React from 'react'
import ReactDOM from 'react-dom'
import App from './'

it('renders without crashing', () => {
  const div: HTMLDivElement = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
