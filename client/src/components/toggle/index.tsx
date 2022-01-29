import { ReactElement, useCallback } from 'react'
import { Container, Switch, Slider, Label } from './style'
import { SunIcon, MoonIcon } from '../../assets/svg'
import { RestProps } from '../../types/shared'
import { useThemeContext } from '../../context/themeContext'

interface ToggleProps {
  on: boolean
  toggle: () => void
}

export default function Toggle(): ReactElement {
  const { mode, setMode } = useThemeContext()

  const toggle: () => void = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }, [mode, setMode])

  const on: boolean = mode === 'dark'

  return (
    <Container>
      <Label aria-label="sun-icon-label">
        <SunIcon fill={on ? 'white' : 'gold'} width={20} height={19} />
      </Label>
      <ToggleButton
        role="button"
        aria-label="toggle-button"
        aria-pressed={on}
        on={on}
        toggle={toggle}
      />
      <Label aria-label="moon-icon-label">
        <MoonIcon fill={on ? 'gold' : '#b8b8b8'} width={13} height={13} />
      </Label>
    </Container>
  )
}

function ToggleButton({ on, toggle, ...restProps }: ToggleProps & RestProps): ReactElement {
  return <ToggleSwitch on={on} toggle={toggle} {...restProps} />
}

function ToggleSwitch({ on, toggle }: ToggleProps): ReactElement {
  return (
    <Switch onClick={toggle}>
      <Slider $on={on} />
    </Switch>
  )
}
