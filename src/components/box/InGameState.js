import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from '../button/Button';

const InGameState = ({clicked}) => {
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
    // 유저 숫자랑 방장 ID 가져오기
    useEffect(() => {
        const fetchData = async () => {
          try {
            const roomCode = getCookieValue("room-code");
            axios.post('http://localhost:8181/getSuperUserID', {roomCode})
                .then(res=>{
                    console.log("서버에서 받은 방장 이름: "+ res.data);
                    const a = encodeURIComponent(res.data);
                    return a;
                }).then((Id)=>{
                   // 유저 숫자 가져오기
                  axios.post('http://localhost:8181/getUserNumber', {roomCode})
                    .then(res=>{
                      console.log("입력받은 유저의 수: " + res.data);
                      return res.data;
                    })
                    .then(number=>{
                      if(number<1){
                        const newText = `최소 한명이 있어야 할 수 있어요 현재 인원: ${number}`;
                        setPresentState(newText);
                      }
                      else {
                      // 방장 한테만 보이는 상태
                      //console.log(getCookieValue("userId"));
                      //console.log(Id);
                      if (getCookieValue("userId") === Id){
                        setIsSatisfied(true);
                        setPresentState("방장");
                      } 
                      // 일반유저한테 보이는 게임 상태
                      else {
                        const newText = `게임 시작 해주세요 현재 인원: ${number}`;
                        setPresentState(newText);
                      }
                }
              });
            });
          } catch (error) {
            console.error('데이터를 불러오는 중 에러 발생:', error);
          }
        };
    
        fetchData(); // 초기 데이터 불러오기
        const intervalId = setInterval(fetchData, 1000);
    
        // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
        return () => {
          clearInterval(intervalId);
        };
      }, []);
    return (
      <>
      {
        isSatisfied ? (
          <div className='button'> 
            <Button title ={"게임 시작"} style={"button5"} event={()=>{
              console.log("게임 시작 버튼 클릭함");
              clicked(true);
            }}/>
        </div>
        ) : 
        (<span className='__present-state'>{presentState}</span>)
      }
      </>
        
    )
}

export default InGameState