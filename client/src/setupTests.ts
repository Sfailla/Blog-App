/*
  jest-dom adds custom jest matchers for asserting on DOM nodes.
  allows you to do things like:

  expect(element).toHaveTextContent(/react/i)
  
  learn more: https://github.com/testing-library/jest-dom
*/
import '@testing-library/jest-dom'
import '@testing-library/user-event'

import { setupServer } from 'msw/node'
import { handlers } from './test/server-handlers'

const server = setupServer(...handlers)
/*
  server.listen()
  Establishes a request interception
  instance before all tests.
*/
beforeAll(() => server.listen())
/*
server.resetHandlers()
Removes request handlers added in runtime.
*/
afterEach(() => server.resetHandlers())
/*
  server.close()
  Stops and cleans up request interception, preventing this
  interception from affecting all irrelevant tests.
*/
afterAll(() => server.close())

beforeAll(() => {
  // mock window.matchMedia to prevent error due to not being available in jestDom
  Object.defineProperty(window, 'matchMedia', {
    value: () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    })
  })

  // mock window.scrollTo to prevent error due to not being available in jestDom
  Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true })
})
