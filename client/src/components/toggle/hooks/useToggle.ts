import { useCallback } from 'react'
import { Mode } from '../../../types/shared'
import { useThemeContext } from '../../../context/theme-context'

interface UseToggle {
  mode: Mode
  toggle: () => void
}

export function useToggle(): UseToggle {
  const { mode, setMode } = useThemeContext()

  const toggle: () => void = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }, [mode, setMode])

  return { mode, toggle }
}
