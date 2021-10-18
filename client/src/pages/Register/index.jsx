import React, { useState, useEffect } from 'react'
import {
  HeaderContainer,
  RegisterPageContainer,
  RegisterH1,
  RegisterH2,
  RegisterFormContainer,
  RegisterLinksContainer,
  RegisterLinkIcon,
  RegisterLinkText,
  GoogleRegisterLink,
  OrOption,
  AccountTypeButtonContainer,
  AccountTypeButton,
} from './styled'
import googleIcon from '../../assets/icons/google-icon-light.svg'
import { LoginLink } from '../Home/styled'

const Register = ({ match }) => {
  const [accountType, setAccountType] = useState('')

  return (
    <RegisterPageContainer>
      {(!accountType && (
        <AccountTypeButtonContainer>
          <AccountTypeButton
            onClick={() => {
              setAccountType('teacher')
            }}
          >
            Teacher
          </AccountTypeButton>
          <AccountTypeButton
            onClick={() => {
              setAccountType('student')
            }}
          >
            Student
          </AccountTypeButton>
          <AccountTypeButton
            onClick={() => {
              setAccountType('parent')
            }}
          >
            Parent
          </AccountTypeButton>
        </AccountTypeButtonContainer>
      )) || (
        <RegisterFormContainer>
          <HeaderContainer>
            <RegisterH1>Welcome to the English Quiz site</RegisterH1>
            <RegisterH2>
              Sign in with google or enter your email to create a {accountType}{' '}
              account.
            </RegisterH2>
          </HeaderContainer>
          <RegisterLinksContainer>
            <GoogleRegisterLink
              href={`http://localhost:8000/api/v1/auth/google/${accountType}`}
            >
              <RegisterLinkIcon src={googleIcon} />
              <RegisterLinkText>Sign In With Google</RegisterLinkText>
            </GoogleRegisterLink>
          </RegisterLinksContainer>
          <OrOption>-- or --</OrOption>
          <p>register form goes here</p>
          <LoginLink to='/login'>
            if you already have an account login
          </LoginLink>
        </RegisterFormContainer>
      )}
    </RegisterPageContainer>
  )
}

export default Register
