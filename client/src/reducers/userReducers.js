import { REGISTER_WITH_EMAIL_SUCCESS } from '../constants/newUserConstants'
import {
  LOGIN_WITH_EMAIL_FAILURE,
  LOGIN_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  VERIFY_LOGGED_IN_USER_FAIL,
  VERIFY_LOGGED_IN_USER_REQUEST,
  VERIFY_LOGGED_IN_USER_SUCCESS,
} from '../constants/userConstants'

export const userReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, ...payload }
    case REGISTER_WITH_EMAIL_SUCCESS:
      return { ...state, ...payload }
    case VERIFY_LOGGED_IN_USER_SUCCESS:
      return { ...state, ...payload }
    case VERIFY_LOGGED_IN_USER_FAIL:
      return null
    case LOGIN_WITH_EMAIL_SUCCESS:
      return { ...state, ...payload }
    case USER_LOGOUT_SUCCESS:
      return null
    default:
      return { ...state }
  }
}

// login with email
export const loginWithEmailReducer = (
  state = { loading: false, error: null },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_WITH_EMAIL_REQUEST:
      return { ...state, loading: true }
    case LOGIN_WITH_EMAIL_SUCCESS:
      return { ...state, loading: false }
    case LOGIN_WITH_EMAIL_FAILURE:
      return { ...state, loading: false, error: payload }
    default:
      return { ...state }
  }
}

// logout user
export const userLogoutReducer = (
  state = { loading: false, error: null },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case USER_LOGOUT_REQUEST:
      return { ...state, loading: true, error: null }
    case USER_LOGOUT_SUCCESS:
      return { ...state, loading: false, error: null }
    case USER_LOGOUT_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return { ...state }
  }
}

// verify that the user is logged in
export const verifyLoggedInUserReducer = (
  state = { loading: false, verified: false, error: '', message: '' },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case VERIFY_LOGGED_IN_USER_REQUEST:
      return { ...state, loading: true, verified: false }
    case VERIFY_LOGGED_IN_USER_SUCCESS:
      return { ...state, loading: false, verified: true }
    case VERIFY_LOGGED_IN_USER_FAIL:
      return { ...state, loading: false, verified: true, error: payload }
    default:
      return { ...state }
  }
}
