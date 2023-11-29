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

  
  // 이 페이지가 마운트 되면
  useEffect(()=>{
    console.log(getCookieValue("roomCode"));
    setRoomCode(getCookieValue("roomCode")); // 방 코드 가져오고
    setIsGetRoomCode(true);
  }, []); 


  // 유저 이름 가져오는 Effect
  useEffect(() => {
    const getUserNameList = () =>{
      axios.post("http://localhost:8181/get-user-list", {roomCode: roomCode})
        .then(res=>{
          setUserList(res.data);
          setIsUserList(true);
        })
    }
    if(isGetRoomCode){
      setInterval(getUserNameList, 1000);
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
            <UserBox userName={userList[0]} show={true} className="first-user-box"/>
            <UserBox userName={userList[1]} show={true} className="second-user-box"/>
            <UserBox userName={userList[2]} show={true} className="third-user-box"/>
            <UserBox userName={userList[3]} show={true} className="forth-user-box"/>
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
            <UserBox userName={userList[4]} show={true} className="five-user-box"/>
            <UserBox userName={userList[5]} show={true} className="six-user-box"/>
            <UserBox userName={userList[6]} show={true} className="seven-user-box"/>
            <UserBox userName={userList[7]} show={true} className="eight-user-box"/>
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