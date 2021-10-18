import React, { useEffect } from 'react'
import {
  AccountTypeButton,
  AccountTypeButtonsContainer,
  GoogleChooseAccountTypeContainer,
} from './styled'
import { createRealAccount, newGoogleUser } from '../../actions/newUserActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import axios from 'axios'

const GoogleChooseAccountType = () => {
  const dispatch = useDispatch()

  const { userInfo, loading, error } = useSelector(
    (state) => state.newGoogleUser
  )

  console.log('userInfo', userInfo)

  // const [accountType, setAccountType] = useState('')

  useEffect(() => {
    dispatch(newGoogleUser())
  }, [dispatch])

  // const checkAgain = () => {
  //   dispatch(newGoogleUser())
  // }

  // const checkAccount = () => {
  //   dispatch(checkInfo())
  //   console.log('finished checking info')
  // }

  const sendAccountType = (type) => {
    console.log('userInfo', userInfo)
    dispatch(createRealAccount(type, userInfo._id))
  }

  const checkUserInfo = async () => {
    const { data } = await axios.get('/api/v1/auth/google/authenticated')
    console.log(data)
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
            to='/student/'
            onClick={() => sendAccountType('student')}
          >
            Student
          </AccountTypeButton>
        </AccountTypeButtonsContainer>
      )}
      <button onClick={() => checkUserInfo()}>check if authenticated</button>
    </GoogleChooseAccountTypeContainer>
  )
}

export default GoogleChooseAccountType
