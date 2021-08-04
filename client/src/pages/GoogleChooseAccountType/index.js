import React, { useEffect, useState } from 'react'
import {
  AccountTypeButton,
  AccountTypeButtonsContainer,
  GoogleChooseAccountTypeContainer,
} from './styled'
import { createRealAccount, newGoogleUser } from '../../actions/newUserActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'

const GoogleChooseAccountType = () => {
  const dispatch = useDispatch()

  const { userInfo, loading, error } = useSelector(
    (state) => state.newGoogleUser
  )
  const [accountType, setAccountType] = useState('')

  useEffect(() => {
    dispatch(newGoogleUser())
  }, [dispatch])

  const checkAgain = () => {
    dispatch(newGoogleUser())
  }

  useEffect(() => {
    console.log('user info', userInfo)
    console.log('loading', loading)
  }, [userInfo])

  const sendAccountType = (type) => {
    dispatch(createRealAccount(type, userInfo._id))
  }

  return (
    <GoogleChooseAccountTypeContainer>
      {loading ? (
        <Loader />
      ) : (
        <AccountTypeButtonsContainer>
          <AccountTypeButton
            to='/teacher/'
            onClick={() => sendAccountType('teacher')}
          >
            Teacher
          </AccountTypeButton>
          <AccountTypeButton
            to='/teacher/'
            onClick={() => sendAccountType('student')}
          >
            Student
          </AccountTypeButton>
        </AccountTypeButtonsContainer>
      )}
    </GoogleChooseAccountTypeContainer>
  )
}

export default GoogleChooseAccountType
