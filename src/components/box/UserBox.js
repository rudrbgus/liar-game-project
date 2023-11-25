import React from 'react';
import "./UserBox.scss";
import axios from 'axios';

const UserBox = ({userName, show, increase}) => {  
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
  
  let boxClassName = "box";
  if(!show){
    boxClassName = "box none";
  }

  const clickUserBoxHandler = (event) =>{
    const user = userName;
    const cookie = getCookieValue("userId");
    const name = decodeURIComponent(cookie);
    console.log(userName);
    axios.post("http://localhost:8181/sendAnwser", {userName: user, cookieName: name });
    increase();
  }
  return (
    <div className={boxClassName} onClick={clickUserBoxHandler}>
        <div className='__img-box'></div>
        <div className='__user-name'>{userName}</div>
    </div>
  )
}

export default UserBox