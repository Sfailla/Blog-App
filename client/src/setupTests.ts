// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import '@testing-library/user-event'
// import axios from 'axios'
// axios.defaults.adapter = require('axios/lib/adapters/http')

// mock window.matchMedia to prevent error due to not being available in jestDom
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: () => {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {}
      }
    }
  })
})
