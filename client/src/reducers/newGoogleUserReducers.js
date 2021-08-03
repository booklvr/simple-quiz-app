import { NEW_GOOGLE_REGISTER_FAIL, NEW_GOOGLE_REGISTER_REQUEST, NEW_GOOGLE_REGISTER_SUCCESS } from "../constants/userConstants";


export const newGoogleUserReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case NEW_GOOGLE_REGISTER_REQUEST:
      return { loading: true }
    case NEW_GOOGLE_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload }
    case NEW_GOOGLE_REGISTER_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}