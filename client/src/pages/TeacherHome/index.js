import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Login from '../../components/Login'
import Register from '../../components/Register'

// import { newGoogleUser } from '../../actions/newUserActions'
// import { userInfo } from '../../actions/userActions'

import { TeacherHomeContainer } from './styled'

const TeacherHome = () => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   // dispatch(newGoogleUser())
  // }, [dispatch])

  // const checkUserInfo = () => {
  //   dispatch(userInfo())
  // }

  return (
    <TeacherHomeContainer>
      welcome to the teacher home page
      <Register></Register>
    </TeacherHomeContainer>
  )
}

export default TeacherHome
