import { ReactElement } from 'react'
import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
  RenderOptions,
  RenderResult
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppProviders } from '../context'

type CustomRenderOptions = RenderOptions & {
  providers?: ReactElement[]
  route?: string
}

async function render(
  ui: ReactElement,
  { route = '/', ...options }: CustomRenderOptions = {}
): Promise<RenderResult> {
  window.history.pushState({}, 'Test home page', route)

  const returnResult = {
    ...rtlRender(ui, { wrapper: AppProviders, ...options })
  }

  // await waitForLoadingToFinish()

  return returnResult
}

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [...screen.queryAllByRole('status')], { timeout: 5000 })

const mockWindowProperty = (property: any, value: any) => {
  const { [property]: originalProperty } = window
  delete window[property]
  beforeAll(() => {
    Object.defineProperty(window, property, {
      configurable: true,
      writable: true,
      value
    })
  })
  afterAll(() => {
    window[property] = originalProperty
  })
}

export * from '@testing-library/react'

export { render, userEvent, waitForElementToBeRemoved, waitForLoadingToFinish, mockWindowProperty }
