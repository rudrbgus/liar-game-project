import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from '../button/Button';

const InGameState = ({userListNumber}) => {


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
    const [userNumber, setUserNumber] = useState(0); // 유저 명수
    const [superUserName, setSuperUserName] = useState("ㅇㅇ"); // 방의 방장 이름

    //유저 숫자 가져오기
    useEffect(() => {
      console.log(userListNumber);
      setUserNumber(userListNumber);
      setPresentState(`현재 ${userListNumber}명 있습니다`);
    }, [userListNumber]);
    
    
    
    return (
      <>
      {
        isSatisfied ? 
        (
          <div className='button'> 
            <Button title ={"게임 시작"} style={"button5"} event={()=>{
              console.log("게임 시작 버튼 클릭함");
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