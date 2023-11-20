import React, { useEffect, useState } from 'react';
import "./RoomCodeButton.scss";
const RoomCodeButton = ({roomCode}) => {
    const [randomCode, setRandomCode] = useState("랜덤코드");
    const clickRoomCodeButtonHandler = (event) =>{
        console.log(randomCode);
    };
    const makeRoomCodeButton = () =>{
        setRandomCode(roomCode);
    }
    useEffect(()=>{
        makeRoomCodeButton();
        console.log("생성됨");
    }, [])

    return (
    <div className='room-code-button' onClick={clickRoomCodeButtonHandler}>
        <span className='__text'>방 코드</span> 
        <span className='__random-code-text'>{randomCode}</span>
    </div>
  ) 
}

export default RoomCodeButton