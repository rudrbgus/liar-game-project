import React, { useState } from 'react'
import "./FindModal.scss";
import Button from '../button/Button';
import axios from 'axios';
import cookie from 'react-cookies';

const FindModal = ({click, change}) => {
    const [inputRoomCode, setInputRoomCode] = useState("");

    const clickModalFrameHandler = (event) =>{        
        if(event.target.className === 'find-modal-frame'){            
            click();
        }        
    }

    // input 값이 변경될 때마다 호출되는 함수
    const handleInputChange = (event) => {
    // 입력 값이 변경될 때마다 상태를 업데이트
        setInputRoomCode(event.target.value);
    };
    const clickCheckButtonHandler = () =>{
        postUserInfo();
        click();
        change(2);
    }
    const postUserInfo = () =>{
            axios.post("http://localhost:8181/compare-room-code", { inputRoomCode })
            .then(res => {
                console.log("입력받은 데이터: " + res.data);
                return res.data; // 이 부분이 추가된 부분
            })
            .then((userData) => {
                cookie.save("userId", userData, { path: '/' });
                console.log("쿠키에 저장된 값: " + userData);
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