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

export const userInfo = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v1/auth/google/authenticated')

    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

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
    console.log('error', error)
    dispatch({
      type: VERIFY_LOGGED_IN_USER_FAIL,
      payload: error,
    })
  }
}

export const loginWithEmail = (email, password) => async (dispatch) => {
  console.log('user actions login')
  console.log('email', email)
  console.log('password', password)
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

    console.log('dataPacket', dataPacket)

    const { data } = await axios.post(URL, dataPacket, config)

    console.log('user login data', data)

    dispatch({
      type: LOGIN_WITH_EMAIL_SUCCESS,
      payload: data.user,
    })

    addMessage(dispatch, data.message)

    // // create message
    // const messageId = uuid()
    // dispatch({
    //   type: ADD_MESSAGE,
    //   payload: { message: data.message, id: messageId },
    // })

    // setTimeout(() => {
    //   dispatch({
    //     type: REMOVE_MESSAGE,
    //     payload: messageId,
    //   })
    // }, 2000)
  } catch (error) {
    // console.log('in the catch block for errors in user actions login')
    // console.log('error', error.response.data)

    const returnError =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    console.log('returnError', returnError)
    // I have no idea what the error message is imbedded so deep? I need to check that out.
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

    const { data } = await axios.get('/api/v1/auth/logout')

    console.log('logout data', data)

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
