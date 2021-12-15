import axios from 'axios'
import {
  CHECK_FOR_EXISTING_EMAIL_FAIL,
  CHECK_FOR_EXISTING_EMAIL_REQUEST,
  CHECK_FOR_EXISTING_EMAIL_SUCCESS,
  REGISTER_WITH_EMAIL_FAILURE,
  REGISTER_WITH_EMAIL_REQUEST,
  REGISTER_WITH_EMAIL_SUCCESS,
} from '../constants/newUserConstants'
import { addMessage } from './utils'



export const registerWithEmail =
  ({ accountType, givenName, familyName, email, password, ...rest }) =>
  async (dispatch) => {

    const dataPacket = {
      accountType,
      givenName,
      familyName,
      email,
      password,
    }

    // add date of birth and classroom code if student
    if (accountType === 'student') {
      const { dateOfBirth, inviteCode } = rest
      Object.assign(dataPacket, { dateOfBirth }, { inviteCode })
    }

    try {
      dispatch({
        type: REGISTER_WITH_EMAIL_REQUEST,
      })


      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const URL = `/api/v1/${accountType}s`

      const { data } = await axios.post(URL, dataPacket, config)


      dispatch({
        type: REGISTER_WITH_EMAIL_SUCCESS,
        payload: data.user,
      })

      addMessage(dispatch, data.message)

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

    console.log('existing user data:', data)

    dispatch({
      type: CHECK_FOR_EXISTING_EMAIL_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: CHECK_FOR_EXISTING_EMAIL_FAIL,
    })
  }
}
