import React from 'react'
import "./ChatBox.scss"
const ChatBox = ({userName, userContext}) => {
  return (
    <div className='chat-box'>
        <div className='__user-name'>{userName}</div>
        <div className='__user-context'>{userContext}</div>
    </div>
  )
}

export default ChatBox