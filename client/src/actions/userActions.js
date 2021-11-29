import axios from 'axios'

import { USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS } from '../constants/userConstants'

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    })

    const {
      data: { message, status, data },
    } = await axios.get('/api/v1/auth/logout')

    dispatch({
      type: USER_LOGOUT_SUCCESS,
    })

    localStorage.removeItem('userInfo')

    console.log(status, message, data)
  } catch (err) {
    console.log(err)
  }
}

// export const registerGoogle = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: USER_REGISTER_REQUEST,
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }

// export const authenticateUser = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: AUTHENTICATE_USER_REQUEST,
//     })

//     const {
//       data: { message, error, user },
//     } = await axios.get('/api/v1/teacher')

//     console.log('message', message)
//     console.log('error', error)
//     console.log('user', user)

//     dispatch({
//       type: AUTHENTICATE_USER_SUCCESS,
//       payload: user,
//     })

//     // console.log('data', data)
//     // console.log('user', data)
//   } catch (err) {
//     console.log(err)
//   }
// }

// export const googleLogin = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: LOGIN_GOOGLE_SUCCESS,
//     })

//     console.log(
//       'made it this far without errors, trying to send request to google'
//     )

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//     }

//     const { data } = await axios.get('/api/v1/auth/google', config)

//     console.log('data', data)
//   } catch (err) {
//     console.log(err)
//   }
// }
