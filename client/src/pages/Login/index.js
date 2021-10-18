import React from 'react'
import {
  GoogleLink,
  GoogleLinkContainer,
  GoogleLinkIcon,
  GoogleLinkText,
  HeaderContainer,
  LoginFormContainer,
  LoginH1,
  LoginH2,
  LoginPageContainer,
  OrOption,
  RegisterLink,
} from './styled'
import googleIcon from '../../assets/icons/google-icon-light.svg'

const Login = ({ match }) => {
  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <HeaderContainer>
          <LoginH1>Welcome to the English Quiz site</LoginH1>
          <LoginH2>Login with google or enter your email and password</LoginH2>
        </HeaderContainer>
        <GoogleLinkContainer>
          <GoogleLink href='http://localhost:8000/api/v1/auth/google'>
            <GoogleLinkIcon src={googleIcon} />
            <GoogleLinkText>Sign In With Google</GoogleLinkText>
          </GoogleLink>
        </GoogleLinkContainer>
        <OrOption>-- or --</OrOption>
        {/* login form goes here */}
        <p>add login form here</p>
        <RegisterLink to='/register'>or register</RegisterLink>
      </LoginFormContainer>
    </LoginPageContainer>
  )
}

export default Login
