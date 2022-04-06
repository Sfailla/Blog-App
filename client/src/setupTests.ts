/*
  jest-dom adds custom jest matchers for asserting on DOM nodes.
  allows you to do things like:

  expect(element).toHaveTextContent(/react/i)
  
  learn more: https://github.com/testing-library/jest-dom
*/
import '@testing-library/jest-dom'
import '@testing-library/user-event'
import { configure, act } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { ReactNode } from 'react'
import { handlers } from './test/server-handlers'

// mocking react-markdown package because jest doesn't yet support esm
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => {
    return children
  }
}))

// speeds up *ByRole queries a bit
// https://github.com/testing-library/dom-testing-library/issues/552
configure({ defaultHidden: true })

const server = setupServer(...handlers)
/*
  server.listen()
  Establishes a request interception
  instance before all tests.
*/
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
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

// mocking localstorage to
jest.spyOn(window.localStorage.__proto__, 'setItem')
jest.spyOn(window.localStorage.__proto__, 'getItem')

afterAll(() => {
  jest.restoreAllMocks()
  jest.resetModules()
})

// real times is a good default to start, individual tests can
// enable fake timers if they need, and if they have, then we should
// run all the pending timers (in `act` because this can trigger state updates)
// then we'll switch back to realTimers.
// it's important this comes last here because jest runs afterEach callbacks
// in reverse order and we want this to be run first so we get back to real timers
// before any other cleanup

afterEach(async () => {
  // waitFor is important here. If there are queries that are being fetched at
  // the end of the test and we continue on to the next test before waiting for
  // them to finalize, the tests can impact each other in strange ways.
  if (jest.isMockFunction(setTimeout)) {
    act(() => jest.runOnlyPendingTimers() as any)
    jest.useRealTimers()
  }
})
