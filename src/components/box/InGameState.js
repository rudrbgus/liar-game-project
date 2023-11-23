import axios from 'axios';
import React, { useEffect, useState } from 'react'

const InGameState = () => {

    const [presentState, setPresentState] = useState("Loading"); // 방 상태 정하는 State

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
    // 인코딩 하는 함수
    const [originalUri, setOriginalUri] = useState('');
    const [encodedUri, setEncodedUri] = useState('');
    const handleEncodeUri = (originalUri) => {
            try {
                const encodedValue = encodeURIComponent(originalUri);
                setEncodedUri(encodedValue);
            } catch (error) {
                console.error('URI 인코딩 중 에러 발생:', error);
                setEncodedUri('인코딩 중 에러가 발생했습니다.');
            }
      };
    // 유저 숫자랑 방장 ID 가져오기
    const [userNumber, setuserNumber] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const roomCode = getCookieValue("room-code");
             // 유저 숫자 가져오기
            const userNumberResponse = await axios.post('http://localhost:8181/getUserNumber', {roomCode});
            setuserNumber(userNumberResponse.data);
            // 방장 Id 가져오는 로직
            axios.get('http://localhost:8181/getSuperUserID')
                .then(res=>{
                    setOriginalUri(res.data); // <- 방장의 이름이 들어감
                });
            handleEncodeUri(originalUri);

            if (userNumber < 1) {
              setPresentState(`최소 3명이 있어야 게임을 할 수 있어요 현재인원: ${userNumber}`);
            } else {
              // 방장 한테만 보이는 상태
              if (getCookieValue("userId") === encodedUri) {
                setPresentState('니 가 방 장 이 야');
              } 
              // 일반유저한테 보이는 게임 상태
              else {
                setPresentState(`게임 시작 해주세요 현재 인원: ${userNumber}`);
              }
            }
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
        <span className='__present-state'>{presentState}</span>
    )
}

export default InGameState