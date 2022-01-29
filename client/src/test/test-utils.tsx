import { FunctionComponent, ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppProviders } from '../context'

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'>

function customRender(ui: ReactElement, options: CustomRenderOptions = {}): RenderResult {
  const wrapper: FunctionComponent = ({ children }) => <AppProviders>{children}</AppProviders>
  return render(ui, { wrapper, ...options })
}

export * from '@testing-library/react'

export { customRender as render, userEvent }
