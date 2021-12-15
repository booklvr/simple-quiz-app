import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  HeaderContainer,
  RegisterPageContainer,
  RegisterH1,
  RegisterFormContainer,
  RegisterLinksContainer,
  RegisterLinkIcon,
  RegisterLinkText,
  GoogleRegisterLink,
  AccountTypeButtonContainer,
  AccountTypeButton,
  AccountTypesContainer,
  AccountTypesMessage,
  EmailRegisterLink,
} from './styled'
import googleIcon from '../../assets/icons/google-icon-light.svg'
import { LoginLink } from '../Home/styled'
import { FaEnvelope } from 'react-icons/fa'
import EmailRegisterForm from '../../components/EmailRegisterForm'

const Register = ({ match }) => {
  const dispatch = useDispatch()
  // const { accountType } = useSelector((state) => state.newUser)

  const [accountType, setAccountType] = useState('teacher')

  const [registerWithEmail, setRegisterWithEmail] = useState(false)

  useEffect(() => {
    if (accountType === '') {
      dispatch(setAccountType('teacher'))
    }
  }, [dispatch, accountType])

  return (
    <RegisterPageContainer>
      <RegisterFormContainer>
        <HeaderContainer>
          <RegisterH1>Sign Up</RegisterH1>
        </HeaderContainer>
        <AccountTypesContainer>
          <AccountTypesMessage>Register as a </AccountTypesMessage>
          <AccountTypeButtonContainer>
            <AccountTypeButton
              onClick={() => setAccountType('teacher')}
              current={'teacher' === accountType}
            >
              Teacher
            </AccountTypeButton>
            <AccountTypeButton
              onClick={() => setAccountType('student')}
              current={'student' === accountType}
            >
              Student
            </AccountTypeButton>
            <AccountTypeButton
              onClick={() => setAccountType('parent')}
              current={'parent' === accountType}
            >
              Parent
            </AccountTypeButton>
          </AccountTypeButtonContainer>
        </AccountTypesContainer>
        {(registerWithEmail && (
          <EmailRegisterForm
            accountType={accountType}
            setRegisterWithEmail={setRegisterWithEmail}
          ></EmailRegisterForm>
        )) || (
          <RegisterLinksContainer>
            <GoogleRegisterLink
              href={`http://localhost:8000/api/v1/auth/google/${accountType}`}
            >
              <RegisterLinkIcon src={googleIcon} />
              <RegisterLinkText>Register With Google</RegisterLinkText>
            </GoogleRegisterLink>
            <EmailRegisterLink onClick={() => setRegisterWithEmail(true)}>
              <FaEnvelope></FaEnvelope>
              <RegisterLinkText>Register with your email</RegisterLinkText>
            </EmailRegisterLink>
          </RegisterLinksContainer>
        )}

        <LoginLink to='/login'>if you already have an account login</LoginLink>
      </RegisterFormContainer>
    </RegisterPageContainer>
  )
}

export default Register
