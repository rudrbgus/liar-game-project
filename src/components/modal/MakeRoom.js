import React, { useState } from 'react';
import "./MakeRoom.scss";
import RadioButton from '../button/RadioButton';
import Button from '../button/Button';
import axios from 'axios';

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
            .then(res =>{
                console.log("입력받은 데이터: "+ res.data);
                setUserName(res.data);
            });
        
        cookie.save("userId", userName,{path: '/'});
        const encodedString = document.cookie;
        const decodedString = decodeURIComponent(encodedString);
        const jsonData = JSON.parse(decodedString);
        console.log("쿠키의 저장된 값:" + jsonData);
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
                        click()
                        change(2)
                    }} />
                </div>            
        </div>
  )
}

export default MakeRoom;