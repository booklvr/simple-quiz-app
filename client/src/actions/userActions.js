import axios from 'axios'

import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstants'

export const registerGoogle = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
  } catch 
}