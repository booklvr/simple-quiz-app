import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

export const LoginPageContainer = styled.div`
  display: flex;
  height: calc(100vh - var(--navbar-height));
  /* background-color: var(--purple); */
  width: 100vw;
  /* display: flex; */
  justify-content: center;
  align-items: center;
`

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 20px 40px;
`

export const HeaderContainer = styled.div``

export const LoginH1 = styled.h1`
  font-size: 30px;
  color: pink;
`

export const LoginH2 = styled.h2`
  font-size: 20px;
`

export const GoogleLinkContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  width: 100%;
`

export const GoogleLink = styled.a`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  text-decoration: none;
  background-color: var(--google);
`

export const GoogleLinkIcon = styled.img`
  width: 28px;
  height: 28px;
  background: #fff;
  margin: 1px;
`

export const GoogleLinkText = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
`

export const OrOption = styled.div`
  font-size: 15px;
  margin: 10px 0;
  text-align: center;
`

export const LoginEmailForm = styled.form``

export const LoginFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`

export const LoginLabel = styled.label``

export const LoginInput = styled.input``

export const RegisterLink = styled(Link)`
  padding: 2rem;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid black;
`

export const EmailFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

export const LoginSubmitButton = styled.button`
  width: 100%;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`
