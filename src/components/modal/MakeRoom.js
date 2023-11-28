import React, { useState } from 'react';
import "./MakeRoom.scss";
import RadioButton from '../button/RadioButton';
import Button from '../button/Button';
import axios from 'axios';
import cookie from 'react-cookies';

const MakeRoom = ({click, change}) => {
    // 모달 밖의 누르면
    const clickModalFrameHandler = (event) =>{        
        if(event.target.className === 'modal-frame'){            
            click();
        }        
    }
    const postUserInfo = () =>{
        axios.post("http://localhost:8181/create-room")
        .then(res => { // 임의의 이름을 보내줌 서버에서
            cookie.save("userId", res.data, { path: '/' });  // <- 그걸 클라이언트 쿠키에 저장
            console.log("쿠키에 저장된 값: " + res.data);
            return true; // 이 부분이 추가된 부분
        })
        .then((isClear) => {
            click();
            change(2);
        });
    }

return (
    <div className='modal-frame' onClick={clickModalFrameHandler}> 
            <div className='__body mount'>                                    
                    <span className='title'>방 만들기</span>
                    <div className='horizontal'/>
                    <span className='rule-title'>규칙</span>
                    <div className='set-rule'>
                        <RadioButton disabled={false} children="규칙1" onClickEvent = {clickRadioButtonHandler} checked={!clicked}/>                            
                        <RadioButton disabled={false} children="규칙2" onClickEvent = {clickRadioButtonHandler} checked={clicked}/>                            
                    </div>
                    <Button title="방 만들기" style="button5" event={()=>{
                        postUserInfo();
                    }} />
                </div>            
        </div>
  )
}

export default MakeRoom;