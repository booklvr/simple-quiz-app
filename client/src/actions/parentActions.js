import axios from 'axios'
import {
  AUTHENTICATE_USER_FAIL,
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
} from '../constants/userConstants'

export const getParentCredentials = () => async (dispatch) => {
  try {
    dispatch({
      type: AUTHENTICATE_USER_REQUEST,
    })

    const {
      data: { message, status, user },
    } = await axios.get('/api/v1/parents')

    console.log('user', user)
    console.log('message', message)
    console.log('status', status)

    dispatch({
      type: AUTHENTICATE_USER_SUCCESS,
      payload: user,
    })

    localStorage.setItem('userInfo', JSON.stringify(user))
  } catch (error) {
    console.log('catch error', error)

    dispatch({
      type: AUTHENTICATE_USER_FAIL,
      payload: error.message,
    })
  }
}
