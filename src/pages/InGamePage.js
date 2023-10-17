import React, { useState } from 'react';
import "./InGamePage.scss";
import UserBox from '../components/box/UserBox';
import ChatBox from '../components/box/ChatBox';

const InGamePage = () => {
  const [userText, setUserText] = useState("");
  const enterUserText = (event) =>{
    console.log("클릭함");
    console.log(event.target.value);
    setUserText(event.target.value);
  }




  return (
    <div className='wrapper'>
      <div className='user-box-left-part'>        
        <UserBox/>
        <UserBox/>
        <UserBox/>
        <UserBox/>
      </div>
      <div className='chat-part'>
        <div className='__room-code'>
          <span className='__room-text'>방 코드</span>
          <span className='__code-text'>#1234</span>
        </div>        
        <span className='__present-state'>게임 시작을 해주세요!</span>
        <div className='__start-game'>박스</div>
        <div className='__chat-box'>
          <div className='__chatiing-box'>
            <ChatBox userName="김민수" userContext={userText}/>
            <ChatBox userName="김민수" userContext="앙 기모띠"/>
            채팅2
          </div>
          <input className='__chat-input' onClick={enterUserText}/>
        </div>
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