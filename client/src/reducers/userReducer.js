import {
  AUTHENTICATE_USER_FAIL,
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  // LOGIN_GOOGLE_FAIL,
  // LOGIN_GOOGLE_REQUEST,
  // LOGIN_GOOGLE_SUCCESS,
} from '../constants/userConstants'

// export const userLoginReducer = (
//   state = { loading: false, userInfo: {} },
//   action
// ) => {
//   console.log('/userLoginReducer')
//   const { type, payload } = action

//   switch (type) {
//     case LOGIN_GOOGLE_REQUEST:
//       return { loading: true }
//     case LOGIN_GOOGLE_SUCCESS:
//       return { loading: false, userInfo: payload }
//     case LOGIN_GOOGLE_FAIL:
//       return { loading: false, error: payload }
//     default:
//       return state
//   }
// }

export const userLogoutReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_LOGOUT_REQUEST:
      return { loading: true }
    case USER_LOGOUT_SUCCESS:
      return { loading: false }
    case USER_LOGOUT_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const userReducer = (state = {}, action) => {
  console.log('/userReducer')
  const { type, payload } = action

  switch (type) {
    case AUTHENTICATE_USER_REQUEST:
      return { loading: true, ...state }
    case AUTHENTICATE_USER_SUCCESS:
      return { loading: false, userInfo: payload }
    case AUTHENTICATE_USER_FAIL:
      return { loading: false, error: payload }
    case USER_LOGOUT_SUCCESS:
      return { ...state, userInfo: null }
    default:
      return state
  }
}
