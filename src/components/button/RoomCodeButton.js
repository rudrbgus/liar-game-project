import React, { useState } from 'react';
import "./RoomCodeButton.scss";
const RoomCodeButton = () => {
    const [randomCode, setRandomCode] = useState("랜덤코드");
    const clickRoomCodeButtonHandler = (event) =>{
        console.log(randomCode);
    };

    return (
    <div className='room-code-button' onClick={clickRoomCodeButtonHandler}>
        <span className='__text'>방 코드</span> 
        <span className='__random-code-text'>{randomCode}</span>
    </div>
  ) 
}

export default RoomCodeButton