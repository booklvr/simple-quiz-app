import React from 'react'
import axios from 'axios'
import { Nav, NavbarContainer, NavBtn, NavBtnLink, NavLogo } from './styled'

const Navbar = () => {
  const dropAllModels = async () => {
    console.log('dropping all models')
    await axios.get('/api/v1/users/deleteAllModels')
  }

  const logout = async () => {
    console.log('logging out...')
    await axios.get('/api/v1/auth/logout')
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
          <button onClick={() => logout()}>Logout</button>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar
