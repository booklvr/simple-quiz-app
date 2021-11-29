import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Nav, NavbarContainer, NavBtn, NavBtnLink, NavLogo } from './styled'
import { logoutUser } from '../../actions/userActions'

const Navbar = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const dropAllModels = async () => {
    console.log('dropping all models')
    await axios.get('/api/v1/users/deleteAllModels')
  }

  const logout = async () => {
    dispatch(logoutUser())

    history.push('/')
    console.log('logging out...')
    await axios.get('/api/v1/auth/logout')
  }

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to='/'>Simple Quiz App</NavLogo>
          <NavBtn>
            <NavBtnLink to='/login'>login</NavBtnLink>
          </NavBtn>
          <button onClick={() => dropAllModels()}>drop all models</button>
          <button onClick={() => logout()}>Logout</button>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar
