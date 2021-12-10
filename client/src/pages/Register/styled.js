import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

export const RegisterPageContainer = styled.div`
  display: flex;
  /* height: calc(100vh - var(--navbar-height)); */
  background-color: var(--purple);
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const AccountTypesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

export const AccountTypesMessage = styled.p`
  font-size: 28px;
  align-self: flex-start;
`

export const AccountTypeButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  margin-bottom: 2rem;
`

export const AccountTypeButton = styled.button`
  padding: 1rem;
  font-size: 28px;
  background-color: ${({ current }) => (current ? 'red' : 'revert')};
`

export const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 20px 40px;
`

export const HeaderContainer = styled.div``

export const RegisterH1 = styled.h1`
  font-size: 30px;
`

export const RegisterLinksContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  width: 100%;
`

export const RegisterLink = styled.a`
  display: flex;
  flex-direction: row;
  height: 30px;
  text-decoration: none;
  background: #fff;
`

export const GoogleRegisterLink = styled(RegisterLink)`
  background-color: var(--google);
  margin-bottom: 1rem;
`

export const EmailRegisterLink = styled.button`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  width: 100%;
`

export const RegisterLinkIcon = styled.img`
  width: 28px;
  height: 28px;
  background: #fff;
  margin: 1px;
`

export const RegisterLinkText = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
`

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const RegisterLabel = styled.label``

export const RegisterInput = styled.input``

export const Login = styled(Link)`
  margin-top: 2rem;
  text-decoration: none;
  cursor: pointer;
`
