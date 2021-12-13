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

export const addClassroomReducer = (
  state = { loading: false, classroom: null, error: null },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case ADD_CLASSROOM_REQUEST:
      return { ...state, loading: true, classroom: null }
    case ADD_CLASSROOM_SUCCESS:
      return { ...state, loading: false, classroom: payload }
    case ADD_CLASSROOM_FAILURE:
      return { ...state, loading: false, error: payload }
    default:
      return { ...state }
  }
}

export const getClassroomReducer = (
  state = { loading: false, classroom: null, error: null },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case GET_CLASSROOM_REQUEST:
      return { ...state, loading: true }
    case GET_CLASSROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        classroom: payload.classroom,
      }
    case GET_CLASSROOM_FAILURE:
      return { ...state, loading: false, error: payload }
    default:
      return { ...state }
  }
}

export const getAllCurrentTeacherClassroomsReducer = (
  state = { loading: false, classrooms: [], results: 0, error: null },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_CURRENT_TEACHERS_CLASSROOMS_REQUEST:
      return { ...state, loading: true }
    case GET_ALL_CURRENT_TEACHERS_CLASSROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        classrooms: payload.classrooms,
        results: payload.results,
      }
    case GET_ALL_CURRENT_TEACHERS_CLASSROOMS_FAILURE:
      return { ...state, loading: false, error: payload }
    default:
      return { ...state }
  }
}

export const verifyInviteCodeReducer = (
  state = { loading: false, verified: false, error: null },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case VERIFY_INVITE_CODE_REQUEST:
      return { ...state, loading: true }
    case VERIFY_INVITE_CODE_SUCCESS:
      return {
        ...state,
        verified: true,
        error: false,
      }
    case VERIFY_INVITE_CODE_FAILURE:
      return { ...state, loading: false, error: payload }
    default:
      return { ...state }
  }
}
