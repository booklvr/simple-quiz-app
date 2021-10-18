import axios from 'axios'
import {
  CREATE_REAL_GOOGLE_ACCOUNT_FAIL,
  CREATE_REAL_GOOGLE_ACCOUNT_REQUEST,
  CREATE_REAL_GOOGLE_ACCOUNT_SUCCESS,
  NEW_GOOGLE_REGISTER_FAIL,
  NEW_GOOGLE_REGISTER_REQUEST,
  NEW_GOOGLE_REGISTER_SUCCESS,
} from '../constants/userConstants'

export const checkInfo = () => async (dispatch) => {
  console.log('checkInfo')

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    console.log('config')
    const { data } = await axios.get('/api/v1/auth/google/test', config)

    console.log('data', data)
  } catch (error) {
    console.log('error')
  }
  console.log('what the fuck')
}

export const newGoogleUser = () => async (dispatch) => {
  console.log('newGoogleUser action start')
  try {
    dispatch({
      type: NEW_GOOGLE_REGISTER_REQUEST,
    })

    console.log('after first dispatch')

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }

    const { data } = await axios.get('/api/v1/auth/google/authenticated')

    const { user } = data

    console.log(user)

    console.log('newUserActions - user', user)
    // console.log('action-user...', user)
    dispatch({
      type: NEW_GOOGLE_REGISTER_SUCCESS,
      payload: user,
    })

    // console.log('I FOUND THAT USER YO', user)
  } catch (error) {
    dispatch({
      type: NEW_GOOGLE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.message.data.message
          : error.message,
    })
  }
}

export const createRealAccount = (type, id) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_REAL_GOOGLE_ACCOUNT_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/v1/users/google',
      { type, id },
      config
    )

    console.log('data', data)
    // const { data } = await axios.get('/api/v1/auth/google/authenticated')

    dispatch({
      type: CREATE_REAL_GOOGLE_ACCOUNT_SUCCESS,
      payload: data,
    })

    console.log(`create google account -- ${type} -- SUCCESS`, data)

    // LOGIN SUCCESS

    // local storage?
  } catch (error) {
    dispatch({
      type: CREATE_REAL_GOOGLE_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.message.data.message
          : error.message,
    })
  }
}
