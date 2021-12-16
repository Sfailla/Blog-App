// TOGGLE COMPONENT IMPORTS
import { render, userEvent } from '../../test/test-utils'
import Toggle from './index'

// USETOGGLE HOOK IMPORTS
import { renderHook, act } from '@testing-library/react-hooks'
import { useToggle } from './hooks/useToggle'
import { AppProvider } from '../../contexts/AppContext'

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

describe('useToggle', () => {
  test('should call toggle fn correctly', () => {
    const wrapper = ({ children }: any) => <AppProvider>{children}</AppProvider>
    const { result } = renderHook(() => useToggle(), { wrapper })

    expect(result.current.mode).toBe('light')

    act(() => result.current.toggle())
    expect(result.current.mode).toBe('dark')

    act(() => result.current.toggle())
    expect(result.current.mode).toBe('light')
  })
})
