import React from 'react'
import { Nav, NavbarContainer, NavBtn, NavBtnLink, NavLogo } from './styled'

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">Simple Quiz App</NavLogo>
          <NavBtn>
            <NavBtnLink to="/register">Sign In</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
    
  )
}

export default Navbar
