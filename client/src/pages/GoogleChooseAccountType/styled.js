import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const GoogleChooseAccountTypeContainer = styled.div`
  height: calc(100vh - var(--navbar-height));
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AccountTypeButtonsContainer = styled.div`
  height: 400px;
  width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const AccountTypeButton = styled(Link)`
  width: 250px;
  height: 300px;
  text-decoration: none;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
`
