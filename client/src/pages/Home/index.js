import React from 'react'
import { HomeContainer, LoginLink } from './styled'
// import axios from 'axios';

const Home = () => {
  return (
    <HomeContainer>
      Welcome to nicks teaching website
      <LoginLink to='/register'>Register</LoginLink>
    </HomeContainer>
  )
}

export default Home
