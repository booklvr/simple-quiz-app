import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// newUserReducers
import {
  newUserReducer,
  registerWithEmailReducer,
  checkForExistingUserReducer,
} from './reducers/newUserReducers'
// --------------------------------------

// userReducers
import {
  loginWithEmailReducer,
  userLogoutReducer,
  userReducer,
  verifyLoggedInUserReducer,
} from './reducers/userReducers'
// ------------------------------

// messageReducers
import { messagesReducer } from './reducers/messagesReducer'
// ----------------------------------------------------------

// classroomReducers
import {
  addClassroomReducer,
  getAllCurrentTeacherClassroomsReducer,
  getClassroomReducer,
  verifyInviteCodeReducer,
} from './reducers/classroomReducer'
import { teacherReducer } from './reducers/teacherReducer'
// ----------------------------------------------------------

// combine reducers
const reducer = combineReducers({
  //reducers
  newUser: newUserReducer,
  checkForExistingUser: checkForExistingUserReducer,
  registerWithEmail: registerWithEmailReducer,
  user: userReducer,
  userLogout: userLogoutReducer,
  verifyLoggedInUser: verifyLoggedInUserReducer,
  loginWithEmail: loginWithEmailReducer,
  messages: messagesReducer,
  addClassroom: addClassroomReducer,
  getAllCurrentTeacherClassrooms: getAllCurrentTeacherClassroomsReducer,
  verifyInviteCode: verifyInviteCodeReducer,
  getClassroom: getClassroomReducer,
  teacher: teacherReducer,
})
// ----------------------------------------------------------

// from local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  user: { ...userInfoFromStorage },
}
// ----------------------------------------------------------

const middleware = [thunk]

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
})

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
