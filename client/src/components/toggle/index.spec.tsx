import { render, userEvent } from '../../test/test-utils'
import Toggle from './index'

describe('Toggle', () => {
  test('toggle triggers light/dark mode colors', async () => {
    const { getByRole, getByLabelText } = render(<Toggle />)
    const toggleButton = getByRole('button')

    const sunIcon = getByLabelText('sun-icon-label').querySelector('svg')!
    const moonIcon = getByLabelText('moon-icon-label').querySelector('svg')!

    const toggle = () => userEvent.click(toggleButton)

    expect(sunIcon.getAttribute('fill')).toBe('gold')
    expect(moonIcon.getAttribute('fill')).toBe('#b8b8b8')

    toggle()

    expect(sunIcon.getAttribute('fill')).toBe('white')
    expect(moonIcon.getAttribute('fill')).toBe('gold')
  })
})
