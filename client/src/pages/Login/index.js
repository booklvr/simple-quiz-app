import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  EmailFormContainer,
  GoogleLink,
  GoogleLinkContainer,
  GoogleLinkIcon,
  GoogleLinkText,
  HeaderContainer,
  LoginEmailForm,
  LoginFormContainer,
  LoginFormGroup,
  LoginH1,
  LoginH2,
  LoginInput,
  LoginLabel,
  LoginPageContainer,
  LoginSubmitButton,
  OrOption,
  RegisterLink,
} from './styled'
import googleIcon from '../../assets/icons/google-icon-light.svg'

const Login = ({ match }) => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submit')
    console.log('email', email)
    console.log('password', password)
    // dispatch(login(email, password))
  }
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
        <EmailFormContainer>
          <LoginEmailForm onSubmit={submitHandler}>
            <LoginFormGroup>
              <LoginLabel>Email</LoginLabel>
              <LoginInput
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></LoginInput>
            </LoginFormGroup>
            <LoginFormGroup>
              <LoginLabel>Password</LoginLabel>
              <LoginInput
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></LoginInput>
            </LoginFormGroup>
            <LoginSubmitButton type='submit'>Login</LoginSubmitButton>
          </LoginEmailForm>
        </EmailFormContainer>
        <RegisterLink to='/register'>or register</RegisterLink>
      </LoginFormContainer>
    </LoginPageContainer>
  )
}

export default Login
