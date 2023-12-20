import React, { useEffect, useState } from 'react';
import "./InGamePage.scss";
import UserBox from '../components/box/UserBox';
import RoomCodeButton from '../components/button/RoomCodeButton';
import axios from 'axios';
import cookie from 'react-cookies';
import InGameState from '../components/box/InGameState';
import InGamePageFinal from './InGamePageFinal';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// 처음 방 만들고 사용자이름 입력 받는거임
const InGamePage = () => {
  const [userText, setUserText] = useState(""); // 유저 채팅
  const [chatArray, setChatArray] = useState([]); // 유저 채팅 배열
  const [roomCode, setRoomCode] = useState("1234");
  const [isGetRoomCode, setIsGetRoomCode] = useState(false);
  const [userList, setUserList] = useState([]); // 유저 리스트
  const [isUserList, setIsUserList] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [isConnecte, setIsConnecte] = useState(false);
  const [receviedList, setReceviedList] = useState([]);

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

  
  // 1 단계 : 방코드 가져오고 방제목으로 하고 웹 소켓연결함.
  useEffect(()=>{
    setRoomCode(getCookieValue("roomId")); // 방 코드 가져와서 방제목으로 설정함
    const socket = new SockJS("http://localhost:8181/ws"); // 웹 소켓 연결
    const stomp = Stomp.over(socket); // stomp 를 연결
    stomp.connect({}, ()=>{setStompClient(stomp)}); // 스톰프 연결
    setIsGetRoomCode(true);      
    return()=>{
      console.log("소켓 제거");
      socket.close();
    }
  }, []);

  // 2 단계 : 스톰프 연결하고 방리스트가져옴
  useEffect(() => {
      if(stompClient && !isConnecte){
        stompClient.subscribe('/topic/list', (list)=>{ 
          setUserList(JSON.parse(list.body));
          console.log(JSON.parse(list.body));
        });
        setIsConnecte(true);
      }
      const message = {
        roomId : getCookieValue("roomId")
      }
      if(stompClient){
        stompClient.send("/app/giveMeList", {}, JSON.stringify(message))
      }
  }, [stompClient]);
  



  return (
    <>
    {
      true ? (
      <div className='wrapper'>
      {/* 왼쪽 화면 */}
        {userList ?(
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
        userList ? (
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
        {/* {<InGamePageFinal roomCode={roomCode}/>} */}
      </>
    )}
    </>
  )
}

export default InGamePage;