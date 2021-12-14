import React, { ReactElement, useEffect, useCallback, useState, useMemo, useContext } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import { Container, Switch, Slider, Label } from './style'
import { SunIcon, MoonIcon } from '../../assets/svg'

interface ToggleInterface {
  on: boolean
  toggle: () => void
}

interface StyledProps extends ToggleInterface {
  $on?: boolean
}

const ToggleContext = React.createContext({} as ToggleInterface)

export default function Toggle(): ReactElement {
  const { mode, setMode } = useAppContext()
  const isLight: boolean = mode === 'light'
  const [on, setOn] = useState<boolean>(isLight)

  const toggle: () => void = useCallback(() => setOn(on => !on), [])

  const value: ToggleInterface = useMemo(() => ({ on, toggle }), [on, toggle])

  useEffect(() => setMode(on ? 'dark' : 'light'), [on, setMode])

  return (
    <ToggleContext.Provider value={value}>
      <Container>
        <Label>
          <SunIcon fill={on ? 'white' : 'gold'} width={20} height={19} />
        </Label>
        <ToggleButton />
        <Label>
          <MoonIcon fill={on ? 'gold' : '#b8b8b8'} width={13} height={13} />
        </Label>
      </Container>
    </ToggleContext.Provider>
  )
}

function ToggleButton({ ...props }: { [x: string]: unknown }): ReactElement {
  const { on, toggle } = useContext(ToggleContext)
  return <ToggleSwitch on={on} toggle={toggle} {...props} />
}

function ToggleSwitch({ on, toggle }: StyledProps): ReactElement {
  return (
    <Switch onClick={toggle} data-testid="toggle-switch">
      <Slider $on={on} />
    </Switch>
  )
}
