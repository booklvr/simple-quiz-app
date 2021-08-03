import React, {useState, useEffect} from 'react'
import { HeaderContainer, RegisterPageContainer, RegisterH1, RegisterH2, RegisterFormContainer, RegisterLink, RegisterLinksContainer, RegisterLinkIcon, RegisterLinkText, GoogleRegisterLink, OrOption } from './styled'
import googleIcon from '../../assets/icons/google-icon-light.svg'

const Register = ({match}) => {

  const [registerType, setRegisterType] = useState()

 
  useEffect(() => {
    setRegisterType(match.params.type)
  },[match.params.type])


  return (
    <RegisterPageContainer>
      <RegisterFormContainer>
        <HeaderContainer>
          <RegisterH1>Welcome to the English Quiz site</RegisterH1>
          <RegisterH2>Sign in with google or enter your email to start.</RegisterH2>
        </HeaderContainer>
        <RegisterLinksContainer>
          <GoogleRegisterLink href='http://localhost:8000/api/v1/auth/google'>
            <RegisterLinkIcon src={googleIcon}/>
            <RegisterLinkText>Sign In With Google</RegisterLinkText>
          </GoogleRegisterLink>
        </RegisterLinksContainer>
        <OrOption>
          -- or -- 
        </OrOption>
        

      </RegisterFormContainer>
      
    </RegisterPageContainer>
  )
}

export default Register
