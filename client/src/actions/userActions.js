import axios from 'axios'
import uuid from 'react-uuid'
import { ADD_MESSAGE, REMOVE_MESSAGE } from '../constants/messageConstants'
import {
  LOGIN_WITH_EMAIL_FAILURE,
  LOGIN_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  VERIFY_LOGGED_IN_USER_FAIL,
  VERIFY_LOGGED_IN_USER_REQUEST,
  VERIFY_LOGGED_IN_USER_SUCCESS,
} from '../constants/userConstants'
import { addMessage } from './utils'

// export const userInfo = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get('/api/v1/auth/google/authenticated')

//   } catch (err) {
//   }
// }

export const verifyLoggedInUser = () => async (dispatch) => {
  try {
    dispatch({
      type: VERIFY_LOGGED_IN_USER_REQUEST,
    })

    const { data } = await axios.get('/api/v1/auth/authenticated')

    dispatch({
      type: VERIFY_LOGGED_IN_USER_SUCCESS,
      payload: data.user,
    })
    localStorage.setItem('userInfo', JSON.stringify(data.user))
  } catch (error) {
    dispatch({
      type: VERIFY_LOGGED_IN_USER_FAIL,
      payload: error,
    })
  }
}

export const loginWithEmail = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_WITH_EMAIL_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const URL = '/api/v1/users/login'

    const dataPacket = {
      email,
      password,
    }


    const { data } = await axios.post(URL, dataPacket, config)


    dispatch({
      type: LOGIN_WITH_EMAIL_SUCCESS,
      payload: data.user,
    })

    addMessage(dispatch, data.message)
  } catch (error) {
    const returnError =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: LOGIN_WITH_EMAIL_FAILURE,
      payload: returnError,
    })
  }
}

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    })

    await axios.get('/api/v1/auth/logout')

    dispatch({
      type: USER_LOGOUT_SUCCESS,
    })
    localStorage.removeItem('userInfo')
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error,
    })
  }
}
