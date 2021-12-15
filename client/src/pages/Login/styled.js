import styled from 'styled-components/macro'

export const LoginPageContainer = styled.div`
  display: flex;
  height: calc(100vh - var(--navbar-height));
  background-color: lightgrey;
  width: 100vw;
  display: flex;
  flex-direction: column;
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

export const HeaderContainer = styled.div`
  font-size: 30px;
`

export const LoginH1 = styled.div``

export const LoginLinksContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  width: 100%;
`

export const LoginLink = styled.a`
  display: flex;
  flex-direction: row;
  height: 30px;
  text-decoration: none;
  background: #fff;
`

export const GoogleLoginLink = styled(LoginLink)`
  background-color: var(--google);
  margin-bottom: 1rem;
`

export const EmailLoginLink = styled.button`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  width: 100%;
`

export const LoginLinkIcon = styled.img`
  width: 28px;
  height: 28px;
  background: #fff;
  margin: 1px;
`

export const LoginLinkText = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
`

