// import {
//   GET_ALL_CURRENT_TEACHERS_CLASSROOMS_REQUEST,
//   GET_ALL_CURRENT_TEACHERS_CLASSROOMS_SUCCESS,
// } from '../constants/classroomConstants'
// import {
//   USER_LOGOUT_REQUEST,
//   USER_LOGOUT_SUCCESS,
//   VERIFY_LOGGED_IN_USER_REQUEST,
//   VERIFY_LOGGED_IN_USER_SUCCESS,
// } from '../constants/userConstants'

// // login with email
// export const teacherReducer = (
//   state = {
//     loading: false,
//     teacher: null,
//     classrooms: [],
//     students: [],
//     error: null,
//   },
//   action
// ) => {
//   const { type, payload } = action

//   switch (type) {
//     case VERIFY_LOGGED_IN_USER_REQUEST:
//     case USER_LOGOUT_REQUEST:
//     case GET_ALL_CURRENT_TEACHERS_CLASSROOMS_REQUEST:
//       return { ...state, loading: true }
//     case VERIFY_LOGGED_IN_USER_SUCCESS:
//       if (payload.accountType === 'teacher') {
//         return { ...state, teacher: payload, error: null, loading: false }
//       } else {
//         return { ...state }
//       }
//     case USER_LOGOUT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         teacher: null,
//         classrooms: [],
//         students: [],
//         error: null,
//       }
//     case GET_ALL_CURRENT_TEACHERS_CLASSROOMS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         classrooms: payload.classrooms,
//         numberOfClasses: payload.results,
//         error: null,
//       }
//     default:
//       return { ...state }
//   }
// }
