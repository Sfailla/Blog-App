import styled from 'styled-components/macro'
import { flex } from '../../styles/mixins'
import { DesignSystem } from '../../styles/shared'

const { color } = DesignSystem

const TOGGLE_WIDTH: number = 48
const TOGGLE_HEIGHT: number = 24
const TOGGLE_GUTTER: number = 4
const TOGGLE_CONTROL_SIZE: number = 14
const TOGGLE_TRANSLATE: number = TOGGLE_WIDTH - TOGGLE_CONTROL_SIZE - TOGGLE_GUTTER

export const Container = styled.div`
  width: 10rem;
  height: 2.4rem;
  ${flex('space-between', 'center')};
`

export const Label = styled.label`
  ${flex()};
`

export const Switch = styled.button`
  width: ${TOGGLE_WIDTH}px;
  height: ${TOGGLE_HEIGHT}px;
  border: 1px solid ${color.secondary.darkgrey};
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  user-select: none;
  background-color: ${color.secondary.white};
`

export const Slider = styled.span<{ $on: boolean }>`
  display: block;
  cursor: pointer;
  width: ${TOGGLE_CONTROL_SIZE}px;
  height: ${TOGGLE_CONTROL_SIZE}px;
  border-radius: 5rem;
  background-color: ${color.primary.teal};
  position: absolute;
  top: ${TOGGLE_GUTTER}px;
  left: ${({ $on }) => ($on ? `${TOGGLE_TRANSLATE}px` : `${TOGGLE_GUTTER}px`)};
  transition: left 0.1s linear;
`
