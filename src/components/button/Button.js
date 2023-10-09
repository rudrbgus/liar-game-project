import React from 'react'
import './Button.scss';

const StartButton = ({title, type}) => {
  let classType = 'button';
  if(type ===1){
    classType = 'button';
  }else if(type ===2){
    classType = 'button2';      
  }
  
  return (
    <div className={classType}>
      <span>{title}</span>
    </div>
  )
}

export default StartButton