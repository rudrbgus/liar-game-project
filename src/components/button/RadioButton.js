import React from 'react';
import "./RadioButton.scss";

const RadioButton = ({children, onClickEvent, checked}) => {
  const clickHandler = () =>{
    onClickEvent();
  }
  const text1 = "라이어는 제시어를 받지 못합니다";
  const text2 = "라이어는 비슷한 제시어를 받습니다";
  return (
    <div className='wrapper'>
      <div className='radio' onClick={clickHandler}>
        <input type='radio' checked={checked}/>
        <div>{children}</div>
      </div>
      {
        children === "규칙1" ? 
        <div className='showContext'>{text1}</div> 
        : <div className='showContext'>{text2}</div>
      }
    </div>
  )
}

export default RadioButton;