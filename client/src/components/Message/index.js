import React from 'react'
import { useSelector } from 'react-redux'

import { MessageContainer, MessageText } from './style'

const Message = () => {
  const messages = useSelector((state) => state.messages)

  console.log('messages', messages)

  return (
    <MessageContainer>
      {messages.map((message, index) => (
        <MessageText key={index}>{message.message}</MessageText>
      ))}
    </MessageContainer>
  )
}

export default Message
