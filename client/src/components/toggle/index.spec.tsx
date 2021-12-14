import { render } from '../../test/test-utils'
import Toggle from './index'

describe('Toggle', () => {
  test('renders initially with default value', () => {
    const { getByTestId, debug } = render(<Toggle />)
    const toggleSwitch = getByTestId('toggle-switch')

    debug(toggleSwitch)
  })
})
