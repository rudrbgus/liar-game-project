import React from 'react'
import './Button.scss';
import Modal from '../modal/Modal';
import ReactDOM from 'react-dom';

const Button = ({title, type}) => {
  let classType = 'button';
  if(type ===1){
    classType = 'button';
  }else if(type ===2){
    classType = 'button2';      
  }
  
  return (
    <div className={classType} onClick={clickButtonHandler} >
      <span>{title}</span>
    </div>
  )
}

const clickButtonHandler = (event) =>{
  event.preventDefault();
  console.log("버튼 클릭");
  ReactDOM.createPortal(<Modal/>, document.getElementById('overlay-root'));  
  
  
}

export default Button