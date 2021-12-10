import axios from 'axios'
import {
  CHECK_FOR_EXISTING_EMAIL_FAIL,
  CHECK_FOR_EXISTING_EMAIL_REQUEST,
  CHECK_FOR_EXISTING_EMAIL_SUCCESS,
  REGISTER_WITH_EMAIL_FAILURE,
  REGISTER_WITH_EMAIL_REQUEST,
  REGISTER_WITH_EMAIL_SUCCESS,
  SET_ACCOUNT_TYPE,
} from '../constants/newUserConstants'

export const setAccountType = (type) => (dispatch) => {
  dispatch({ type: SET_ACCOUNT_TYPE, payload: type })
}

export const registerWithEmail =
  ({ accountType, givenName, familyName, email, password, ...rest }) =>
  async (dispatch) => {
    console.log('register with email action')

    const dataPacket = {
      accountType,
      givenName,
      familyName,
      email,
      password,
    }

    // add date of birth and classroom code if student
    if (accountType === 'student') {
      const { dateOfBirth, classroomCode } = rest
      Object.assign(dataPacket, { dateOfBirth }, { classroomCode })
    }
    console.log('dataPacket', dataPacket)

    try {
      dispatch({
        type: REGISTER_WITH_EMAIL_REQUEST,
      })

      // console.log(accountType, givenName, familyName, email, password)

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const URL = `/api/v1/${accountType}s`

      const { data } = await axios.post(URL, dataPacket, config)

      console.log('data', data)

      dispatch({
        type: REGISTER_WITH_EMAIL_SUCCESS,
        payload: data.user,
      })

      // dispatch({
      //   type: USER_LOGIN,
      //   payload: data.user,
      // })

      localStorage.setItem('userInfo', JSON.stringify(data.user))
    } catch (error) {
      dispatch({
        type: REGISTER_WITH_EMAIL_FAILURE,
        payload: error,
      })
    }
  }

export const checkForExistingEmail = (email) => async (dispatch) => {
  dispatch({
    type: CHECK_FOR_EXISTING_EMAIL_REQUEST,
  })

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const URL = `/api/v1/users/checkForExistingUser`

    const { data } = await axios.post(URL, email, config)

    console.log(data)

    dispatch({
      type: CHECK_FOR_EXISTING_EMAIL_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: CHECK_FOR_EXISTING_EMAIL_FAIL
    })
  }
}

// export const createRealAccount = (type, id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: CREATE_REAL_GOOGLE_ACCOUNT_REQUEST,
//     })

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }

//     const { data } = await axios.post(
//       '/api/v1/users/google',
//       { type, id },
//       config
//     )

//     console.log('data', data)
//     // const { data } = await axios.get('/api/v1/auth/google/authenticated')

//     dispatch({
//       type: CREATE_REAL_GOOGLE_ACCOUNT_SUCCESS,
//       payload: data,
//     })

//     console.log(`create google account -- ${type} -- SUCCESS`, data)

//     // LOGIN SUCCESS

//     // local storage?
//   } catch (error) {
//     dispatch({
//       type: CREATE_REAL_GOOGLE_ACCOUNT_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.message.data.message
//           : error.message,
//     })
//   }
// }
