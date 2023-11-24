import React, { useEffect, useState } from 'react';
import "./InGamePage.scss";
import UserBox from '../components/box/UserBox';
import ChatBox from '../components/box/ChatBox';
import RoomCodeButton from '../components/button/RoomCodeButton';
import axios from 'axios';
import cookie from 'react-cookies';
import InGameState from '../components/box/InGameState';

// 처음 방 만들고 사용자이름 입력 받는거임
const InGamePage = () => {
  const [userText, setUserText] = useState(""); // 유저 채팅
  const [chatArray, setChatArray] = useState([]); // 유저 채팅 배열
  const [isClick, setIsClick] = useState(false);
  const [global, setGlobal] = useState(false);

  
  const[userNameList, setUserNameList] = useState([]); // 유저 리스트
  // 유저 이름 가져오는 effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:8181/get-user-list", {roomCode});
        setUserNameList(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };
  
    const handleBeforeUnload = async () => {
      // 사용자가 페이지를 떠날 때 서버에 신호 보내기
      try {
        const userId = getCookieValue("userId"); // userId 쿠키 값 가져오기
        const roomCode = getCookieValue("room-code"); // room-code 쿠키 값 가져오기
        await axios.post('http://localhost:8181/user-leave', {userId, roomCode});
      } catch (error) {
        console.error("사용자 떠남 신호 전송 중 오류 발생:", error);
      }
    };
    // 초기에 데이터 가져오기
    fetchData();
    // 1초마다 데이터를 가져오는 간격 설정
    const intervalId = setInterval(()=>{
      console.log("나 이름 가져오는 새끼 인데 여기서는 글로벌이: " + global);
      if(!global){
        fetchData();
      }
    }, 1000);
    // beforeunload 이벤트 리스너 설정
    window.addEventListener('beforeunload', handleBeforeUnload);
    // 클린업 함수
    return () => {
      // 간격 제거
      clearInterval(intervalId);
      console.log("클린업이 실행되었습니다");
      // beforeunload 이벤트 리스너 제거
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [global]);

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

  // 방 코드 서버에서 불러오기
  const [isLoading, setIsLoading] = useState(true);
  const [roomCode, setRoomCode] = useState("1234");
  useEffect(()=>{
    axios.post("http://localhost:8181/getRoomCode", {userName: userNameList[0]})
      .then(res=>{
        setRoomCode(res.data);
        cookie.save("room-code", res.data);
        setIsLoading(false);
      });
  }, []);

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

  //서버에서 채팅 내용을 가져오는 함수
  useEffect(() => {
  const getChat = async () => {
    try {
          const chatList=await axios.post("http://localhost:8181/getChatList");
          //console.log(chatList);
          //console.log(chatList.data[0].userName);
          //console.log(chatList.data[0].userContext);
          setChatArray(chatList.data);
        
      } catch (error) {
        console.error("채팅 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    getChat(); // 최초 렌더링 시 한 번 실행
    const intervalId = setInterval(()=>{
      if(!global){
        getChat();
      }
    }, 1000);
    // 컴포넌트가 언마운트될 때 clearInterval을 통해 인터벌 정리
    return () => {
      clearInterval(intervalId);
      console.log("클린업");
    };
  }, [global]);

  const clicked = (click) => {
    console.log("클릭했고");
    setIsClick(click); // 여기서 시작 버튼을 누르면 isClick이 true가 됨
  }



  useEffect(()=>{
    if(isClick){
      console.log("실행");
      axios.get("http://localhost:8181/gameStart");
    }
  }, [isClick])

  useEffect(()=>{
    const start = () =>{
      axios.get("http://localhost:8181/gameState").then(res=>{
        console.log(res.data);
        setGlobal(res.data);
      });
    }
    setInterval(()=>{
      start();
    }, 1000);
  },[])








  return (
    <>
    {
      !global ? (
      <div className='wrapper'>
      {/* 왼쪽 화면 */}
      <div className='user-box-left-part'>
        <UserBox userName={userNameList[0]} show={true} className="first-user-box"/>
        <UserBox userName={userNameList[1]} show={true} className="second-user-box"/>
        <UserBox userName={userNameList[2]} show={true} className="third-user-box"/>
        <UserBox userName={userNameList[3]} show={true} className="forth-user-box"/>
      </div>
      {/* 중앙 화면 */}
      <div className='chat-part'>
        {isLoading?(<span>Loading...</span>):(<RoomCodeButton roomCode={roomCode} />)}
        {/* 게임 상황 */}
        <InGameState clicked={clicked} />
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
        <UserBox userName={userNameList[4]} show={true} className="five-user-box"/>
        <UserBox userName={userNameList[5]} show={true} className="six-user-box"/>
        <UserBox userName={userNameList[6]} show={true} className="seven-user-box"/>
        <UserBox userName={userNameList[7]} show={true} className="eight-user-box"/>
      </div>
    </div>
    ):(
      <div className='ingame-wrapper'>
        {/* 왼쪽 화면 */}
        <div className='user-box-left-part'>
          <UserBox userName={userNameList[0]} show={true} className="ingame-first-user-box"/>
          <UserBox userName={userNameList[1]} show={true} className="ingame-second-user-box"/>
          <UserBox userName={userNameList[2]} show={true} className="ingame-third-user-box"/>
          <UserBox userName="시작했어 이 씨발롬아" show={true} className="ingame-forth-user-box"/>
        </div>
        {/* 중앙 화면 */}
        <div className='chat-part'>
          {isLoading?(<span>Loading...</span>):(<RoomCodeButton roomCode={roomCode} />)}
          {/* 게임 상황 */}
          <InGameState clicked={clicked}/>
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
    </div>
    )}
    </>
  )
}

export default InGamePage;