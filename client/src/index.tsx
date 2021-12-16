import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyles } from './styles/global'
import { App } from './components'
import reportWebVitals from './reportWebVitals'
import { AppProvider } from './contexts/AppProviders'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('⚛️')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
