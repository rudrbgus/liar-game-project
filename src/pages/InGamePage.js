import React, { useEffect, useState } from 'react';
import "./InGamePage.scss";
import UserBox from '../components/box/UserBox';
import ChatBox from '../components/box/ChatBox';
import RoomCodeButton from '../components/button/RoomCodeButton';
import axios from 'axios';

// 처음 방 만들고 사용자이름 입력 받는거임
const InGamePage = ({name, roomCode}) => {

  const [userText, setUserText] = useState("");
  const [chatArray, setChatArray] = useState([]);

  const enterUserText = (event) => {
    if (event.key === 'Enter') {
      const newChat = {
        userName: name,
        userContext: event.target.value
      };
      // 기존 채팅 배열에 새로운 채팅 추가
      setChatArray([...chatArray, newChat]);
      // 입력 창 초기화
      setUserText("");
    }
  };
    
  return (
    <div className='wrapper'>
      {/* 왼쪽 화면 */}
      <div className='user-box-left-part'>
        <UserBox userName={name} show={true}/>
        <UserBox show={false}/>
        <UserBox show={false}/>
        <UserBox show={false}/>
      </div>
      {/* 중앙 화면 */}
      <div className='chat-part'>
        <RoomCodeButton roomCode={roomCode} />
        <span className='__present-state'>게임 시작을 해주세요!</span>
        <div className='__chat-box'>
          <div className='__chatiing-box'>
            {/* 채팅 내용을 매핑하여 출력 */}
            {chatArray.map((chat, index) => (
              <div key={index} className='__chat-item'>
                  <span className='__chat-user'>{chat.userName}:</span>
                  <span className='__chat-text'>{chat.userContext}</span>
              </div>
              ))
            }
          </div>
          <input
            className='__chat-input'
            value={userText}
            onChange={(event) => setUserText(event.target.value)}
            onKeyDown={enterUserText}
          />
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