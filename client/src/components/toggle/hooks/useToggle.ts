import { useCallback } from 'react'
import { Mode } from '../../../../types/shared'
import { useAppContext } from '../../../contexts/AppProviders'

interface UseToggle {
  mode: Mode
  toggle: () => void
}

export function useToggle(): UseToggle {
  const { mode, setMode } = useAppContext()

  const toggle: () => void = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }, [mode, setMode])

  return { mode, toggle }
}
