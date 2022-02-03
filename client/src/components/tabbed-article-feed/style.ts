import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'

const { color } = DesignSystem
const tabWidth: number = 13

export const Container = styled.div`
  width: 100%;
  height: auto;
`

export const AnimatedTabSlider = styled.div`
  width: ${tabWidth}rem;
  height: 3px;
  background-color: ${({ theme }) => theme.text.secondary};
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateX(0);
  transform-origin: 0 0;
  transition: transform 0.2s ease-in;
`

export const Tab = styled.li`
  width: ${tabWidth}rem;
  height: 4.2rem;
  padding: 8px 1.5rem;
  ${flex()};
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  cursor: pointer;
  color: ${color.secondary.darkgrey};
`

export const TabContainer = styled.ul`
  width: 100%;
  height: 4.2rem;
  ${flex('flex-start')};
  position: relative;
`

export const ActiveTab = styled(Tab)`
  color: ${({ theme }) => theme.text.secondary};

  &:first-child ~ ${AnimatedTabSlider} {
    transform: translateX(0) scaleX(1);
  }
  &:nth-child(2) ~ ${AnimatedTabSlider} {
    transform: translateX(100%) scaleX(1);
  }
`

export const ContentContainer = styled.div``

export const Content = styled.div``

export const Header = styled.div`
  width: 100%;
  height: 4.2rem;
  ${flex('space-between')};
  border-bottom: 1px solid #9daec2;
`

export const Actions = styled.div`
  height: 100%;
  ${flex('center', 'flex-end')};
  padding-bottom: 5px;
`

export const EmptyStateMessage = styled.div`
  color: ${color.notifications.error};
`
