import uuid from 'uuid'
import { ADD_MESSAGE, REMOVE_MESSAGE } from '../constants/messageConstants'

export const addMessage = (dispatch, message) => {
  // create message
  const messageId = uuid()
  dispatch({
    type: ADD_MESSAGE,
    payload: { message, id: messageId },
  })

  setTimeout(() => {
    dispatch({
      type: REMOVE_MESSAGE,
      payload: messageId,
    })
  }, 2000)
}
