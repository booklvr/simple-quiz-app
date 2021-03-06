import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { newGoogleUserReducer } from './reducers/newGoogleUserReducers'

const reducer = combineReducers({
  //reducers
  newGoogleUser: newGoogleUserReducer,
  // userLogin: userLoginReducer,
})

// from local storage
// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null

const initialState = {
  // from local storage
}

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
