import React, { useState } from 'react'
import {
  EmailLoginLink,
  GoogleLoginLink,
  HeaderContainer,
  LoginFormContainer,
  LoginH1,
  LoginLinkIcon,
  LoginLinksContainer,
  LoginLinkText,
  LoginPageContainer,
} from './styled'
import googleIcon from '../../assets/icons/google-icon-light.svg'
import { FaEnvelope } from 'react-icons/fa'
import { LoginLink } from '../Home/styled'
import LoginEmailForm from '../../components/LoginEmailForm'

const Login = ({ match }) => {
  const [loginWithEmail, setLoginWithEmail] = useState(false)

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <HeaderContainer>
          <LoginH1>Login</LoginH1>
        </HeaderContainer>

        {(loginWithEmail && (
          <LoginEmailForm
            setLoginWithEmail={setLoginWithEmail}
          ></LoginEmailForm>
        )) || (
          <LoginLinksContainer>
            <GoogleLoginLink href={`http://localhost:8000/api/v1/auth/google`}>
              <LoginLinkIcon src={googleIcon} />
              <LoginLinkText>Sign In With Google</LoginLinkText>
            </GoogleLoginLink>
            <EmailLoginLink onClick={() => setLoginWithEmail(true)}>
              <FaEnvelope></FaEnvelope>
              <LoginLinkText>Sign in with your email</LoginLinkText>
            </EmailLoginLink>
          </LoginLinksContainer>
        )}

        <LoginLink to='/register'>
          if you don't have an account register
        </LoginLink>
      </LoginFormContainer>
    </LoginPageContainer>
  )
}

export default Login

// <LoginFormContainer>
//         <HeaderContainer>
//           <LoginH1>Welcome to the English Quiz site</LoginH1>
//           <LoginH2>Login with google or enter your email and password</LoginH2>
//         </HeaderContainer>
//         <GoogleLinkContainer>
//           <GoogleLink href='http://localhost:8000/api/v1/auth/google'>
//             <GoogleLinkIcon src={googleIcon} />
//             <GoogleLinkText>Sign In With Google</GoogleLinkText>
//           </GoogleLink>
//         </GoogleLinkContainer>
//         <OrOption>-- or --</OrOption>
//         {/* login form goes here */}
//         <p>add login form here</p>
//         <RegisterLink to='/register'>or register</RegisterLink>
//       </LoginFormContainer>
