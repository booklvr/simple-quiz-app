import axios from 'axios'
import {
  AUTHENTICATE_USER_FAIL,
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
} from '../constants/userConstants'

export const getTeacherCredentials = () => async (dispatch) => {
  try {
    dispatch({
      type: AUTHENTICATE_USER_REQUEST,
    })

    // const {
    //   userLogin: { userInfo },
    // } = getState()

    const {
      data: { message, status, user },
    } = await axios.get('/api/v1/teachers')

    console.log('user', user)
    console.log('message', message)
    console.log('status', status)

    // console.log('message', message)
    // console.log('error', error)
    // console.log('user', user)

    dispatch({
      type: AUTHENTICATE_USER_SUCCESS,
      payload: user,
    })

    // console.log('data', data)
    // console.log('user', data)
    localStorage.setItem('userInfo', JSON.stringify(user))
  } catch (error) {
    console.log('catch error', error)

    dispatch({
      type: AUTHENTICATE_USER_FAIL,
      payload: error.message,
    })
  }
}
