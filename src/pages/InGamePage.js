import React, { useState } from 'react';
import "./InGamePage.scss";
import UserBox from '../components/box/UserBox';
import ChatBox from '../components/box/ChatBox';
import RoomCodeButton from '../components/button/RoomCodeButton';

const InGamePage = () => {
  const [userText, setUserText] = useState("");
  const [chatArray, setChatArray] = useState([]);
  const enterUserText = (event) =>{
    if(event.key === 'Enter'){
      console.log("123");
      setUserText(event.target.value);
      setChatArray(<ChatBox userName="김만덕" userContext={event.target.value}/>);
    }    
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
        <RoomCodeButton/>      
        <span className='__present-state'>게임 시작을 해주세요!</span>
        {/* <div className='__start-game'>박스</div> */}
        <div className='__chat-box'>
          <div className='__chatiing-box'>
            {
              chatArray
            }            
          </div>
          <input className='__chat-input' onKeyDown={enterUserText}/>
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