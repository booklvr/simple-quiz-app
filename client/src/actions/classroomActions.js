import axios from 'axios'
import {
  ADD_CLASSROOM_FAILURE,
  ADD_CLASSROOM_REQUEST,
  ADD_CLASSROOM_SUCCESS,
  GET_ALL_CURRENT_TEACHERS_CLASSROOMS_FAILURE,
  GET_ALL_CURRENT_TEACHERS_CLASSROOMS_REQUEST,
  GET_ALL_CURRENT_TEACHERS_CLASSROOMS_SUCCESS,
  GET_CLASSROOM_FAILURE,
  GET_CLASSROOM_REQUEST,
  GET_CLASSROOM_SUCCESS,
  VERIFY_INVITE_CODE_FAILURE,
  VERIFY_INVITE_CODE_REQUEST,
  VERIFY_INVITE_CODE_SUCCESS,
} from '../constants/classroomConstants'

export const addClassroom =
  ({ className, owner }) =>
  async (dispatch) => {
    console.log('addClassroom action')

    const dataPacket = {
      className,
      owner,
    }

    // add date of birth and classroom code if student

    try {
      dispatch({
        type: ADD_CLASSROOM_REQUEST,
      })

      // console.log(accountType, givenName, familyName, email, password)

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const URL = `/api/v1/classrooms`

      const { data } = await axios.post(URL, dataPacket, config)

      console.log('data', data)

      const { data: classroom } = data

      dispatch({
        type: ADD_CLASSROOM_SUCCESS,
        payload: classroom,
      })
    } catch (error) {
      const returnError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      console.log('return error', returnError)
      dispatch({
        type: ADD_CLASSROOM_FAILURE,
        payload: returnError,
      })
    }
  }

export const getCurrentTeachersClassrooms = () => async (dispatch) => {
  // add date of birth and classroom code if student

  try {
    dispatch({
      type: GET_ALL_CURRENT_TEACHERS_CLASSROOMS_REQUEST,
    })

    const URL = `/api/v1/classrooms`

    const {
      data: { data: classrooms, status, results },
    } = await axios.get(URL)

    console.log('clsasrooms', classrooms)
    console.log('status', status)
    console.log('results', results)

    // const {
    //   data: { data: classrooms },
    //   results,
    //   status,
    // } = await axios.get(URL)

    // console.log('classrooms', classrooms)
    // console.log('status', status)
    // console.log('results', results)

    dispatch({
      type: GET_ALL_CURRENT_TEACHERS_CLASSROOMS_SUCCESS,
      payload: {
        classrooms,
        results,
      },
    })
  } catch (error) {
    const returnError =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    console.log('return error', returnError)
    dispatch({
      type: GET_ALL_CURRENT_TEACHERS_CLASSROOMS_FAILURE,
      payload: returnError,
    })
  }
}

export const getClassroomDetails = (classroomSlug) => async (dispatch) => {
  // add date of birth and classroom code if student

  try {
    dispatch({
      type: GET_CLASSROOM_REQUEST,
    })

    const URL = `/api/v1/classrooms/${classroomSlug}`

    const {
      data: { classroom, status, message },
    } = await axios.get(URL)

    console.log('clsasroom', classroom)
    console.log('status', status)
    console.log('message', message)

    // const {
    //   data: { data: classrooms },
    //   results,
    //   status,
    // } = await axios.get(URL)

    // console.log('classrooms', classrooms)
    // console.log('status', status)
    // console.log('results', results)

    dispatch({
      type: GET_CLASSROOM_SUCCESS,
      payload: {
        classroom,
      },
    })
  } catch (error) {
    const returnError =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    console.log('return error', returnError)
    dispatch({
      type: GET_CLASSROOM_FAILURE,
      payload: returnError,
    })
  }
}

export const verifyCheckInviteCode = (inviteCode) => async (dispatch) => {
  // add date of birth and classroom code if student

  try {
    dispatch({
      type: VERIFY_INVITE_CODE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const dataPacket = {
      inviteCode,
    }

    const URL = `/api/v1/classrooms/verify-invite-code`

    const { data } = await axios.post(URL, dataPacket, config)

    console.log('data', data)
    // const {
    //   data: { data: classrooms },
    //   results,
    //   status,
    // } = await axios.get(URL)

    // console.log('classrooms', classrooms)
    // console.log('status', status)
    // console.log('results', results)

    dispatch({
      type: VERIFY_INVITE_CODE_SUCCESS,
    })
  } catch (error) {
    const returnError =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    console.log('return error', returnError)
    dispatch({
      type: VERIFY_INVITE_CODE_FAILURE,
      payload: returnError,
    })
  }
}
