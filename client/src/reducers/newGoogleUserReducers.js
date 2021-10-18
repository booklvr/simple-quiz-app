import {
  NEW_GOOGLE_REGISTER_FAIL,
  NEW_GOOGLE_REGISTER_REQUEST,
  NEW_GOOGLE_REGISTER_SUCCESS,
  SET_GOOGLE_ACCOUNT_TYPE,
} from '../constants/userConstants'

export const newGoogleUserReducer = (
  state = { loading: false, userInfo: {} },
  action
) => {
  console.log('/newgoogleuserreducer')
  const { type, payload } = action

  switch (type) {
    case NEW_GOOGLE_REGISTER_REQUEST:
      return { loading: true }
    case NEW_GOOGLE_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload }
    case NEW_GOOGLE_REGISTER_FAIL:
      return { loading: false, error: payload }
    case SET_GOOGLE_ACCOUNT_TYPE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          accountType: payload,
        },
      }
    default:
      return state
  }
}
