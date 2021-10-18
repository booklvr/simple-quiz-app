import axios from 'axios'

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

export const registerGoogle = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
  } catch (err) {
    console.log(err)
  }
}

export const userInfo = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v1/auth/google/authenticated')

    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
