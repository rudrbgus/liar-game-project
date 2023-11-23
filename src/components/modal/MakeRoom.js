import React, { useState } from 'react';
import "./MakeRoom.scss";
import RadioButton from '../button/RadioButton';
import Button from '../button/Button';
import axios from 'axios';
import cookie from 'react-cookies';

const MakeRoom = ({click, change, codeAndId}) => {
    // 모달 밖의 누르면
    const clickModalFrameHandler = (event) =>{        
        if(event.target.className === 'modal-frame'){            
            click();
        }        
    }
    // 규칙 1 , 2 클릭하는거
    const [clicked , setClicked] = useState(false); 
    const clickRadioButtonHandler = () =>{
        setClicked(!clicked);
    } 
    const [userName, setUserName] = useState("아무개");
    const postUserInfo = () =>{
        axios.post("http://localhost:8181/create-room")
        .then(res => {
            console.log("입력받은 데이터: " + res.data);
            setUserName(res.data);
            return res.data; // 이 부분이 추가된 부분
        })
        .then((userData) => {
            cookie.save("userId", userData, { path: '/' });
            console.log("쿠키에 저장된 값: " + userData);
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
                        click();
                        change(2);
                    }} />
                </div>            
        </div>
  )
}

export default MakeRoom;