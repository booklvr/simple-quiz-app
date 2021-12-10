import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  AccountTypeButton,
  AccountTypeButtonsContainer,
  ChooseAccountTypeContainer,
  ChooseAccountTypeHeader,
} from './styled'
// import { createRealAccount, newGoogleUser } from '../../actions/newUserActions'
import { useDispatch } from 'react-redux'
// import Loader from '../../components/Loader'
import { setAccountType } from '../../actions/newUserActions'

const ChooseAccountType = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const sendAccountType = (type) => {
    dispatch(setAccountType(type))
    history.push('/register')
  }

  return (
    <ChooseAccountTypeContainer>
      <ChooseAccountTypeHeader>
        Choose your Account Type
      </ChooseAccountTypeHeader>
      <AccountTypeButtonsContainer>
        <AccountTypeButton onClick={() => sendAccountType('teacher')}>
          Teacher
        </AccountTypeButton>
        <AccountTypeButton onClick={() => sendAccountType('student')}>
          Student
        </AccountTypeButton>
        <AccountTypeButton onClick={() => sendAccountType('parent')}>
          Parent
        </AccountTypeButton>
      </AccountTypeButtonsContainer>
    </ChooseAccountTypeContainer>
  )
}

//   return (
//     <GoogleChooseAccountTypeContainer>
//       {loading ? (
//         <Loader />
//       ) : (
//         <AccountTypeButtonsContainer>
//           <AccountTypeButton
//             to='/teacher/'
//             onClick={() => sendAccountType('teacher')}
//           >
//             Teacher
//           </AccountTypeButton>
//           <AccountTypeButton
//             to='/student/'
//             onClick={() => sendAccountType('student')}
//           >
//             Student
//           </AccountTypeButton>
//         </AccountTypeButtonsContainer>
//       )}
//       <button onClick={() => checkUserInfo()}>check if authenticated</button>
//     </GoogleChooseAccountTypeContainer>
//   )
// }

export default ChooseAccountType
