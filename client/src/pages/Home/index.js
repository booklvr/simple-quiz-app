import React from 'react'
import { HomeContainer, LoginLink } from './styled'
// import axios from 'axios';

const Home = () => {
  return (
    <HomeContainer>
      Welcome to nicks teaching website
      <LoginLink to='/choose-account'>Start</LoginLink>
    </HomeContainer>
  )
}

export default Home
