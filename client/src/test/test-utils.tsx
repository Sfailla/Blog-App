import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { AppProvider } from '../contexts/AppContext'

type CustomRenderOptions = {
  renderOptions?: Omit<RenderOptions, 'wrapper'>
}

function customRender(
  ui: ReactElement,
  { ...renderOptions }: CustomRenderOptions = {}
): RenderResult {
  const Wrapper: FunctionComponent = ({ children }) => {
    return <AppProvider>{children}</AppProvider>
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export { customRender as render }
