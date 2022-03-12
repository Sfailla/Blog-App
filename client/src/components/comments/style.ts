import styled from 'styled-components/macro'
import { DesignSystem } from '../../styles/shared'

const {
  typography: { heading_lg }
} = DesignSystem

export const Container = styled.div`
  width: 100%;
  margin-top: 4rem;
  /* background-color: lightpink; */
`

export const Title = styled.h2`
  ${heading_lg()};
  font-size: 3rem;
  margin-bottom: 2rem;
`

export const Form = styled.form`
  width: 100%;
  height: auto;
  padding-top: 2rem;
`

export const FormGroup = styled.div`
  width: inherit;
  height: inherit;
`

export const TextArea = styled.textarea`
  width: 100%;
  max-width: 60rem;
  height: 10rem;
  border: none;
  outline: none;
  padding: 2rem;
  border-radius: 8px;
  background-color: lightgray;
  resize: none;
`

export const Divider = styled.hr``

export const GridContainer = styled.div``
export const Wrapper = styled.div``
