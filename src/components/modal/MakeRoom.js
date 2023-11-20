import React, { useState } from 'react';
import "./MakeRoom.scss";
import RadioButton from '../button/RadioButton';
import Button from '../button/Button';
import axios from 'axios';

const MakeRoom = ({click, change, getUserName, getRoomCode}) => {
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
    // 임의의 방 코드를 만드는 함수
    const generateRandomRoomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 4; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };
    const postUserInfo = () =>{
        const temporaryIdentifier = generateTemporaryIdentifier();
        const randomRoomCode =  generateRandomRoomCode();
        getRoomCode(randomRoomCode);
        // 서버로 임시 식별자를 POST 요청으로 전송합니다.
        axios.post('http://localhost:8181/create-room', {temporaryIdentifier, randomRoomCode})
            .then(response => {
                console.log(response.data);
                getUserName(response.data);
            })
            .catch(error => {
                console.error('Error sending data: ', error);
            });
    }
    // 임시 식별자를 생성하는 함수
    const generateTemporaryIdentifier = () => {
        return Math.random().toString(36).substring(7);
    };
    

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
                        postUserInfo()
                        click()
                        change(2)
                    }} />
                </div>            
        </div>
  )
}

export default MakeRoom;