import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

export const HomeContainer = styled.div`
  width: 100%;
  height: calc(100vh - var(--navbar-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const LoginLink = styled(Link)`
  padding: 2rem;
  font-size: 2rem;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid black;
`
