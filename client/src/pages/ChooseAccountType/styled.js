import styled from 'styled-components/macro'

export const ChooseAccountTypeContainer = styled.div`
  height: calc(100vh - var(--navbar-height));
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ChooseAccountTypeHeader = styled.h2`
  font-size: 40px;
`

export const AccountTypeButtonsContainer = styled.div`
  height: 400px;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const AccountTypeButton = styled.button`
  width: 250px;
  height: 50px;
  margin: 10px 0;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`
