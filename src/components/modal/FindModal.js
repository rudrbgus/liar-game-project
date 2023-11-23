import React, { useState } from 'react'
import "./FindModal.scss";
import Button from '../button/Button';
import axios from 'axios';
import cookie from 'react-cookies';

const FindModal = ({click, change}) => {
    
    // 방 찾기 모달 끄는 핸들러
    const clickModalFrameHandler = (event) =>{        
        if(event.target.className === 'find-modal-frame'){            
            click();
        }        
    }
    const [inputRoomCode, setInputRoomCode] = useState("");
    // input 값이 변경될 때마다 호출되는 함수
    const handleInputChange = (event) => {
    // 입력 값이 변경될 때마다 상태를 업데이트
        setInputRoomCode(event.target.value);
    };
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
    const clickCheckButtonHandler = () =>{
        postUserInfo();
        
    }
    const postUserInfo = () =>{
            const roomCode = getCookieValue("room-code");
            axios.post("http://localhost:8181/compare-room-code", { inputRoomCode,  roomCode})
            .then(res => {
                console.log("입력받은 데이터: " + res.data);
                return res.data; // 이 부분이 추가된 부분
            })
            .then((userData) => {
                cookie.save("userId", userData, { path: '/' });
                console.log("쿠키에 저장된 값: " + userData);
                click();
                change(2);
            });
            ;    
    }
  return (
    <div className='find-modal-frame' onClick={clickModalFrameHandler}>
        <div className='__body'>
            <div className='__title'>
                방 코드
            </div>
            <input className='__input' type='input' onChange={handleInputChange}>
            </input>
            <Button title="확인" style="button6" event={clickCheckButtonHandler}/>
        </div>
    </div>
  )
}

export default FindModal;