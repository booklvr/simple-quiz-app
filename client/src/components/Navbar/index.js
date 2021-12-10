import React from 'react'
import axios from 'axios'
import { Nav, NavbarContainer, NavBtn, NavBtnLink, NavLogo } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import { logout } from '../../actions/userActions'
import { useHistory } from 'react-router'

const Navbar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, error } = useSelector((state) => state.userLogout)
  const user = useSelector((state) => state.user)

  // remove later
  const dropAllModels = async () => {
    console.log('dropping all models')
    // dispatch(logout())
    await axios.get('/api/v1/users/deleteAllModels')
  }

  const getCurrentUser = async () => {
    console.log('checking current user')
    const { data } = await axios.get('/api/v1/users/getCurrentUser')
    console.log(data)
  }

  const handleLogout = () => {
    console.log('logging out...')
    dispatch(logout())
    history.push('/')
    // await axios.get('/api/v1/auth/logout')
  }

  const handleLogin = () => {
    history.push('/login')
  }

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to='/'>Simple Quiz App</NavLogo>
          <NavBtn>
            <NavBtnLink to='/register'>Register</NavBtnLink>
          </NavBtn>
          <button onClick={() => dropAllModels()}>drop all models</button>
          <button onClick={() => getCurrentUser()}>check user</button>

          {(loading && <Loader />) ||
            (!user && <button onClick={() => handleLogin()}>Login</button>) || (
              <button onClick={() => handleLogout()}>Logout</button>
            )}
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar
