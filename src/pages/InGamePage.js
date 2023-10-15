import React from 'react';
import "./InGamePage.scss";
import UserBox from '../components/box/UserBox';

const InGamePage = () => {
  return (
    <div className='wrapper'>
      <div className='user-box-left-part'>        
        <UserBox/>
        <UserBox/>
        <UserBox/>
        <UserBox/>
      </div>
      <div className='chat-part'>
        <span className='__room-code'>방 코드</span>
        <span className='__present-state'>게임 시작을 해주세요!</span>
        <div className='__start-game'>박스</div>
        <div className='__chat-box'>채팅 하는 박스</div>
      </div>
      <div className='user-box-right-part'>
        <UserBox/>
        <UserBox/>
        <UserBox/>
        <UserBox/>
      </div>
    </div>
  )
}

export default InGamePage;  