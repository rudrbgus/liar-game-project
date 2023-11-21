import React from 'react'
import "./FindModal.scss";
import Button from '../button/Button';
import axios from 'axios';

const FindModal = ({click, change}) => {
    const clickModalFrameHandler = (event) =>{        
        if(event.target.className === 'find-modal-frame'){            
            click();
        }        
    }
    const clickCheckButtonHandler = () =>{
        postUserInfo();
        click();
        change(2);
    }
    const postUserInfo = () =>{
        const temporaryIdentifier = generateTemporaryIdentifier();
        axios.post("http://localhost:8181/find-room-code", {inputRoomCode, temporaryIdentifier});
    }
    // 임시 식별자를 생성하는 함수
    const generateTemporaryIdentifier = () => {
        return Math.random().toString(36).substring(7);
    };
  return (
    <div className='find-modal-frame' onClick={clickModalFrameHandler}>
        <div className='__body'>
            <div className='__title'>
                방 코드
            </div>
            <input className='__input' type='input' value={inputRoomCode}>
                
            </input>
            <Button title="확인" style="button6" event={clickCheckButtonHandler}/>
        </div>
    </div>
  )
}

export default FindModal;