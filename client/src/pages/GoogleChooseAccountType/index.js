import React, {useEffect} from 'react'
import { AccountTypeButton, AccountTypeButtonsContainer, GoogleChooseAccountTypeContainer } from './styled'
import {newGoogleUser} from '../../actions/newUserActions';
import { useDispatch } from 'react-redux'


const GoogleChooseAccountType = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(newGoogleUser);
  })

  return (
    <GoogleChooseAccountTypeContainer>
      <AccountTypeButtonsContainer>
        <AccountTypeButton>Teacher</AccountTypeButton>
        <AccountTypeButton>Student</AccountTypeButton>
      </AccountTypeButtonsContainer>
    </GoogleChooseAccountTypeContainer>
  )
}

export default GoogleChooseAccountType
