import React from 'react'
import { useContext } from '../../contexts/AppContext'
import { ChildrenPropType } from '../../types'
import { Container, Switch, Slider, Label } from './style'
import { SunIcon, MoonIcon } from '../../assets/svg'

interface ToggleContextInterface {
  on: boolean
  toggle: () => void
}

const ToggleContext = React.createContext({} as ToggleContextInterface)

function Toggle(): React.ReactElement {
  const [on, setOn] = React.useState<boolean>(false)
  const { setMode } = useContext()

  const toggle: () => void = React.useCallback(() => setOn(on => !on), [])

  React.useMemo(() => setMode(on ? 'dark' : 'light'), [on, setMode])

  const value: ToggleContextInterface = React.useMemo(() => ({ on, toggle }), [on, toggle])

  return (
    <ToggleContext.Provider value={value}>
      <ToggleLabel>
        <SunIcon fill={on ? 'white' : 'gold'} width={20} height={19} />
      </ToggleLabel>
      <ToggleButton />
      <ToggleLabel>
        <MoonIcon fill={on ? 'gold' : 'white'} width={13} height={13} />
      </ToggleLabel>
    </ToggleContext.Provider>
  )
}

function ToggleLabel({ children }: ChildrenPropType): React.ReactElement {
  return <Label>{children}</Label>
}

function ToggleSwitch({ on, toggle }: ToggleContextInterface): React.ReactElement {
  return (
    <Switch onClick={toggle} data-testid="toggle-switch">
      <Slider $on={on} />
    </Switch>
  )
}

function ToggleButton({ ...props }: { [x: string]: unknown }): React.ReactElement {
  const { on, toggle } = React.useContext(ToggleContext)
  return <ToggleSwitch {...{ on, toggle }} {...props} />
}

export default Toggle
