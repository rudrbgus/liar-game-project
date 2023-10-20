import React from 'react';
import "./UserBox.scss";

const UserBox = ({userName, show}) => {  
  let boxClassName = "box";
  if(!show){
    boxClassName = "box none";
  }
  return (
    <div className={boxClassName}>
        <div className='__img-box'></div>
        <div className='__user-name'>{userName}</div>
    </div>
  )
}

export default UserBox