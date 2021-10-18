import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { newGoogleUser } from '../../actions/newUserActions'

import { StudentHomeContainer } from './styled'

const StudentHome = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newGoogleUser())
  }, [dispatch])

  return (
    <StudentHomeContainer>
      welcome to the student home page
    </StudentHomeContainer>
  )
}

export default StudentHome
