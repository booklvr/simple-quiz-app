import { ADD_MESSAGE, REMOVE_MESSAGE } from '../constants/messageConstants'

export const messagesReducer = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_MESSAGE:
      return [...state, payload]

    case REMOVE_MESSAGE:
      return [...state].filter((message) => message.id !== payload)
    default:
      return state
  }
}
