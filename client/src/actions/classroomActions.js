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
  ({ className, teacher }) =>
  async (dispatch) => {

    const dataPacket = {
      className,
      teacher,
    }

    // add date of birth and classroom code if student

    try {
      dispatch({
        type: ADD_CLASSROOM_REQUEST,
      })


      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const URL = `/api/v1/classrooms`

      const { data } = await axios.post(URL, dataPacket, config)


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
        : error.message('return error', returnError)
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

    dispatch({
      type: VERIFY_INVITE_CODE_SUCCESS,
    })
  } catch (error) {
    const returnError =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: VERIFY_INVITE_CODE_FAILURE,
      payload: returnError,
    })
  }
}
