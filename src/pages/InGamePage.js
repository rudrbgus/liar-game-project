import React, { useEffect, useState } from 'react';
import "./InGamePage.scss";
import UserBox from '../components/box/UserBox';
import ChatBox from '../components/box/ChatBox';
import RoomCodeButton from '../components/button/RoomCodeButton';
import axios from 'axios';

const InGamePage = () => {
  useEffect(()=>{
    axios.get("http://localhost:8181/create-room")
      .then(res => res)
  });

  const [userText, setUserText] = useState("");
  const [chatArray, setChatArray] = useState([]);
  // 유저 입력 받아서 배열에 넣기
  const enterUserText = (event) =>{
    if(event.key === 'Enter'){
      console.log("123");
      setUserText(event.target.value);
      setChatArray(...chatArray, <ChatBox userName="김만덕" userContext={event.target.value}/>);
    }    
  }
    
  return (
    <div className='wrapper'>
      {/* 왼쪽 화면 */}
      <div className='user-box-left-part'>
        <UserBox userName="김만덕" show={true}/>
        <UserBox show={false}/>
        <UserBox show={false}/>
        <UserBox show={false}/>
      </div>
      {/* 중앙 화면 */}
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
      {/* 오른쪽 화면 */}
      <div className='user-box-right-part'>
        <UserBox userName="김만덕" show={false}/>
        <UserBox show={false}/>
        <UserBox show={false}/>
        <UserBox show={false}/>        
      </div>
    </div>
  )
}

export default InGamePage;