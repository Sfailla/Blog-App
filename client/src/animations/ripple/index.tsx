import { MouseEvent, CSSProperties, useState } from 'react'
import { Span } from './style'

interface Props {
  minRippleSize?: number
  styles?: CSSProperties
}

interface Ripple {
  key?: number
  style?: CSSProperties
}

type UseRipple = [handleMakeRipple: (event: MouseEvent) => void, rippleArray: JSX.Element[]]

export default function useRippleEffect({
  styles = {},
  minRippleSize = 100
}: Props = {}): UseRipple {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleMakeRipple = (event: MouseEvent) => {
    const { left, top } = event.currentTarget.getBoundingClientRect()

    const x = event.clientX - left
    const y = event.clientY - top

    const rippleSize = Math.min(
      event.currentTarget.clientHeight,
      event.currentTarget.clientWidth,
      minRippleSize
    )

    const newRipple: Ripple = {
      key: event.timeStamp,
      style: {
        width: rippleSize,
        height: rippleSize,
        left: x - rippleSize / 2,
        top: y - rippleSize / 2,
        ...styles
      }
    }

    setRipples((prevState: Ripple[]): Ripple[] => [...prevState, newRipple])
  }

  const rippleArray: JSX.Element[] = ripples.map(currentRipple => {
    const handleAnimationEnd = () => {
      setRipples((prevState: Ripple[]): Ripple[] =>
        prevState.filter(ripple => ripple.key !== currentRipple.key)
      )
    }

    return <Span {...currentRipple} onAnimationEnd={handleAnimationEnd} />
  })

  return [handleMakeRipple, rippleArray]
}
