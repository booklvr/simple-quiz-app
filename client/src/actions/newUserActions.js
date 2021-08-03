import axios from 'axios'
import { NEW_GOOGLE_REGISTER_FAIL, NEW_GOOGLE_REGISTER_REQUEST } from "../constants/userConstants"

export const newGoogleUser = () => async (dispatch) => {
  try {
    dispatch({
      type: NEW_GOOGLE_REGISTER_REQUEST
    })

    const {user} = await axios.get('/api/v1/auth/google/authenticated')

    console.log('I FOUND THAT USER YO', user);
    


  } catch (error) {
    dispatch({
      type: NEW_GOOGLE_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.message.data.message : error.message
    })
  }
}