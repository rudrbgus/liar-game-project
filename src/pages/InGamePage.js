import React, { useEffect, useState } from 'react';
import "./InGamePage.scss";
import UserBox from '../components/box/UserBox';
import RoomCodeButton from '../components/button/RoomCodeButton';
import axios from 'axios';
import cookie from 'react-cookies';
import InGameState from '../components/box/InGameState';
import InGamePageFinal from './InGamePageFinal';

// 처음 방 만들고 사용자이름 입력 받는거임
const InGamePage = () => {
  const [userText, setUserText] = useState(""); // 유저 채팅
  const [chatArray, setChatArray] = useState([]); // 유저 채팅 배열
  const [isClick, setIsClick] = useState(false);
  const [global, setGlobal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [roomCode, setRoomCode] = useState("1234");
  const [isGetRoomCode, setIsGetRoomCode] = useState(false);
  const [userList, setUserList] = useState([]); // 유저 리스트
  const [isUserList, setIsUserList] = useState(false);
  const [websocket, setWebSocket] = useState(null);

  // 쿠키에서 특정 키의 값을 가져오는 함수
  const getCookieValue = (key) => {
    const cookiePairs = document.cookie.split("; ");
    for (let i = 0; i < cookiePairs.length; i++) {
      const pair = cookiePairs[i].split("=");
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return null;
    };

    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);

  

    const handleMessage = (message) => {
        setMessages([...messages, message]);
    };

    const sendMessage = (text) => {
        stompClient.send('/app/chat.sendMessage', {}, JSON.stringify({ content: text }));
    };  

    const handleSend = (text) => {
        sendMessage(text);
    };
    


  // 사용자가 채팅 치면 작동하는 핸들러
  const enterUserText = (event) => {
    if (event.key === 'Enter') {
      const userId = getCookieValue("userId"); // userId 쿠키 값 가져오기
      const userContext = event.target.value;
      axios.post("http://localhost:8181/addChat", {userId, userContext});                                                                               
      // 입력 창 초기화
      setUserText("");
    }
  };

  
  // 이 페이지가 마운트 되면
  useEffect(()=>{
    setRoomCode(getCookieValue("roomId")); // 방 코드 가져와서 방제목으로 설정함
    const socket = new WebSocket("ws://localhost:8181/ws");
    socket.onopen = () =>{
      console.log("연결 성공");
    }
    setIsGetRoomCode(true);  
    setWebSocket(socket);
    
    return()=>{
      console.log("소켓 제거");
      socket.close();
    }
  }, []);




  // 방 코드 입력 받고 나서
  useEffect(() => {
    if(isGetRoomCode){
      axios.post("http://localhost:8181/get-user-list", {roomCode: roomCode})
        .then((res)=>{
          console.log(res.data);
          setUserList(res.data);
          setIsUserList(true);
          if(websocket.readyStatus === WebSocket.OPEN){
            const message = { content: '1' };
            websocket.send(JSON.stringify(message));
          }
        });
    }
  }, [isGetRoomCode]);


  return (
    <>
    {
      !global ? (
      <div className='wrapper'>
      {/* 왼쪽 화면 */}
        {isUserList ?(
          <div className='user-box-left-part'>
            <UserBox userName={userList[0] ? userList[0].playerId: "미정"} show={userList[0] ? true : false} className="first-user-box"/>
            <UserBox userName={userList[1] ? userList[1].playerId: "미정"} show={userList[1] ? true : false} className="second-user-box"/>
            <UserBox userName={userList[2] ? userList[2].playerId: "미정"} show={userList[2] ? true : false} className="third-user-box"/>
            <UserBox userName={userList[3] ? userList[3].playerId: "미정"} show={userList[3] ? true : false} className="forth-user-box"/>
          </div>
          ):(
            <div>Loading</div>
          )
        }
      {/* 중앙 화면 */}
      <div className='center-box'>
        {/* 방 코드 */}
          {isGetRoomCode ? (<RoomCodeButton roomCode={roomCode}/>):(<div>Loading</div>)}
        {/* 게임 상황 */}
          {isUserList ? (<InGameState roomCode={roomCode}/>):(<div>Loading...</div>)}
      </div>
      {/* 오른쪽 화면 */}
      {
        isUserList ? (
          <div className='user-box-right-part'>
            <UserBox userName={userList[4]? userList[4].playerId: "미정"} show={userList[4] ? true : false} className="five-user-box"/>
            <UserBox userName={userList[5]? userList[5].playerId: "미정"} show={userList[5] ? true : false} className="six-user-box"/>
            <UserBox userName={userList[6]? userList[6].playerId: "미정"} show={userList[6] ? true : false} className="seven-user-box"/>
            <UserBox userName={userList[7]? userList[7].playerId: "미정"} show={userList[7] ? true : false} className="eight-user-box"/>
          </div>
        ):(<div>Loading</div>)
      }
      
    </div>
    ):(
      <>
        {global && <InGamePageFinal roomCode={roomCode}/>}
      </>
    )}
    </>
  )
}

export default InGamePage;