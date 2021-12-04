import React from 'react'
import { useAppContext } from '../../contexts/AppContext'
import { Container, Switch, Slider, Label } from './style'
import { SunIcon, MoonIcon } from '../../assets/svg'

interface ToggleContextInterface {
  on: boolean
  toggle: () => void
}

const ToggleContext = React.createContext({} as ToggleContextInterface)

function Toggle(): React.ReactElement {
  const { mode, setMode } = useAppContext()
  const isLight: boolean = mode === 'light'
  const [on, setOn] = React.useState<boolean>(isLight)
  const toggle: () => void = React.useCallback(() => setOn(on => !on), [])
  const value: ToggleContextInterface = React.useMemo(() => ({ on, toggle }), [on, toggle])

  React.useEffect(() => setMode(on ? 'dark' : 'light'), [on, setMode])

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

function ToggleSwitch({ on, toggle }: ToggleContextInterface): React.ReactElement {
  return (
    <Switch onClick={toggle} data-testid="toggle-switch">
      <Slider $on={on} />
    </Switch>
  )
}

function ToggleButton({ ...props }: { [x: string]: unknown }): React.ReactElement {
  const { on, toggle } = React.useContext(ToggleContext)
  return <ToggleSwitch on={on} toggle={toggle} {...props} />
}

export default Toggle
