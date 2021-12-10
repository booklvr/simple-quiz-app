import {
  CHECK_FOR_EXISTING_EMAIL_FAIL,
  CHECK_FOR_EXISTING_EMAIL_REQUEST,
  CHECK_FOR_EXISTING_EMAIL_SUCCESS,
  REGISTER_WITH_EMAIL_FAILURE,
  REGISTER_WITH_EMAIL_REQUEST,
  REGISTER_WITH_EMAIL_SUCCESS,
  SET_ACCOUNT_TYPE,
} from '../constants/newUserConstants'
import {
  VERIFY_LOGGED_IN_USER_FAIL,
  VERIFY_LOGGED_IN_USER_REQUEST,
  VERIFY_LOGGED_IN_USER_SUCCESS,
} from '../constants/userConstants'

export const verifyLoggedInUserReducer = (
  state = { loading: false, error: null },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case VERIFY_LOGGED_IN_USER_REQUEST:
      return { ...state, loading: true }
    case VERIFY_LOGGED_IN_USER_SUCCESS:
      return { ...state, loading: false }
    case VERIFY_LOGGED_IN_USER_FAIL:
      return { ...state, loading: false, error: payload.error }
    default:
      return { ...state }
  }
}

export const newUserReducer = (state = { accountType: '' }, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_ACCOUNT_TYPE:
      return { ...state, accountType: payload }

    default:
      return state
  }
}

export const registerWithEmailReducer = (
  state = { loading: false, user: {}, error: null },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case REGISTER_WITH_EMAIL_REQUEST:
      return { ...state, loading: true }
    case REGISTER_WITH_EMAIL_SUCCESS:
      return { ...state, loading: false, userInfo: payload }
    case REGISTER_WITH_EMAIL_FAILURE:
      return { ...state, loading: false, error: payload }
    default:
      return { ...state }
  }
}

export const checkForExistingUserReducer = (
  state = { loading: false, emailExists: false, error: null },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case CHECK_FOR_EXISTING_EMAIL_REQUEST:
      return { ...state, loading: true }
    case CHECK_FOR_EXISTING_EMAIL_SUCCESS:
      return { ...state, loading: false, emailExists: true }
    case CHECK_FOR_EXISTING_EMAIL_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return { ...state }
  }
}
