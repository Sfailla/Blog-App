import { render, userEvent } from '../../test/test-utils'
import ToastNotification from '.'

describe('toast notification unit tests', () => {
  const message: string = 'test message'

  test('Toast should display correctly', () => {
    const { getByText, getByRole, queryByText } = render(
      <ToastNotification variant="success" message={message} />
    )
    expect(getByText(message)).toBeInTheDocument()
    userEvent.click(getByRole('button'))
    expect(queryByText(message)).not.toBeInTheDocument()
  })

  test('should change color depending on variant', () => {
    const { rerender, container } = render(
      <ToastNotification variant="success" message={message} />
    )
    expect(container.firstChild).toHaveStyle('border-color: #47d764')
    rerender(<ToastNotification variant="error" message={message} />)
    expect(container.firstChild).toHaveStyle('border-color: #dc3545')
    rerender(<ToastNotification variant="info" message={message} />)
    expect(container.firstChild).toHaveStyle('border-color: #2f86eb')
    rerender(<ToastNotification variant="warning" message={message} />)
    expect(container.firstChild).toHaveStyle('border-color: #ffc021')
  })
})
