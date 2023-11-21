import React, { useEffect, useState } from 'react';
import "./InGamePage.scss";
import UserBox from '../components/box/UserBox';
import ChatBox from '../components/box/ChatBox';
import RoomCodeButton from '../components/button/RoomCodeButton';
import axios from 'axios';

// 처음 방 만들고 사용자이름 입력 받는거임
const InGamePage = ({ roomCode}) => {
  const [userNameList, setUserNameList] = useState([]);
  const [userText, setUserText] = useState(""); // 유저 이름
  const [chatArray, setChatArray] = useState([]); // 유저 채팅

  //  --------유저 추가 될 때 ----------
  useEffect(() => {
    axios.get('http://localhost:8181/get-user-list')
      .then((response) => {
        // 서버로부터 응답을 받은 후에 방을 만들거나 다른 작업 수행
        createRoom();
      })
      .catch((error) => {
        console.error('Error fetching user list:', error);
      });
  }, []);
  const createRoom = async () => {
    // 여기에서 방을 만들거나 다른 작업 수행
    await axios.post('http://localhost:8181/create-room', { /* 방 생성에 필요한 데이터 */ });
  };



  const enterUserText = (event) => {
    if (event.key === 'Enter') {
      const newChat = {
        userName: "1",
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
        <UserBox userName={"1"} show={true} className="first-user-box"/>
        <UserBox userName={"2"} show={true} className="second-user-box"/>
        <UserBox userName={"3"} show={true} className="third-user-box"/>
        <UserBox userName={"4"} show={true} className="forth-user-box"/>
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
        <UserBox userName={"5"} show={true} className="five-user-box"/>
        <UserBox userName={"6"} show={true} className="six-user-box"/>
        <UserBox userName={"7"} show={true} className="seven-user-box"/>
        <UserBox userName={"8"} show={true} className="eight-user-box"/>
      </div>
    </div>
  )
}

export default InGamePage;