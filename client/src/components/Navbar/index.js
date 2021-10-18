import React from 'react'
import axios from 'axios'
import { Nav, NavbarContainer, NavBtn, NavBtnLink, NavLogo } from './styled'

const Navbar = () => {
  const dropAllModels = async () => {
    console.log('dropping all models')
    await axios.get('/api/v1/users/deleteAllModels')
  }

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to='/'>Simple Quiz App</NavLogo>
          <NavBtn>
            <NavBtnLink to='/register'>Sign In</NavBtnLink>
          </NavBtn>
          <button onClick={() => dropAllModels()}>drop all models</button>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar
