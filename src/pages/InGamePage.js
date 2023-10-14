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
        채팅파트
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