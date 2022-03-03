import { Fragment, ReactElement, useEffect } from 'react'
import { Location, useLocation } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

const ScrollRestore = (props: Props): ReactElement => {
  const location: Location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)

    return () => {
      window.scrollTo(0, 0)
    }
  }, [location])

  return <Fragment>{props.children}</Fragment>
}

export default ScrollRestore
