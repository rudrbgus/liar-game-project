import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from '../button/Button';

const InGameState = ({userListNumber, setStarted, stompClient}) => {


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
    // 방 상태 정하는 State
    const [presentState, setPresentState] = useState("Loading"); 
    const [isSatisfied, setIsSatisfied] = useState(false);
    const [isSubscribe, setIsSubscribe] = useState(false);
    const [gameState, setGameState] = useState("");

    // 상태창 변경하고 방장이면 게임 시작 버튼 ON
    useEffect(() => {
      setPresentState(`현재 ${userListNumber}명 있습니다`);
      if(getCookieValue("isSuperUser") === "true"){
        setPresentState(`당신은 방장입니다 현재 ${userListNumber}명 있습니다`);
        if(userListNumber>1){
          setIsSatisfied(true);
        }
      }
    }, [userListNumber]);

    useEffect(()=>{
      if(stompClient && !isSubscribe){
        stompClient.subscribe('/topic/game', (game)=>{ 
          setStarted(true);
        });
        console.log("게임챗 구독");
        setIsSubscribe(true);
      }
    }, [userListNumber]);

    useEffect(()=>{
      if(isSubscribe){
        console.log(gameState);
      }
    }, [gameState]);
    
    
    
    return (
      <>
      {
        isSatisfied ? 
        (
          <div className='button'> 
            <Button title ={"게임 시작"} style={"button5"} event={()=>{
              console.log("게임 시작 버튼 클릭함");
              const message = {
                text : "게임 시작함"
              }
              stompClient.send("/app/gameStart", {}, JSON.stringify(message));
            }}/>
          </div>
        ) 
        : 
        (
          <span className='__present-state'>{presentState}</span>
        )
      }
      </>
        
    )
}

export default InGameState