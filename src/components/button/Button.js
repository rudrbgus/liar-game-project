import React, { useState } from 'react'
import './Button.scss';
import ReactDOM from 'react-dom';
import RuleModal from '../modal/RuleModal';

const Button = ({title, type, event}) => {  
  let classType = '';
  if(type ===1){
    classType = 'button';
  }else if(type ===2){
    classType = 'button2';
  }
  
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () =>{
    if(type === 2)
        setIsOpen(!isOpen); 
    else
        event();
  }
  const clickExitHandler = () =>{
        setIsOpen(!isOpen);
  }

  return (
    <>
    <div className={classType} onClick={openModalHandler} >
      <span>{title}</span>
    </div> 
    {
        isOpen && type ===2 && (
          ReactDOM.createPortal(<RuleModal click={clickExitHandler}/>, document.getElementById('overlay-root'))
        )      
    }    
    
    </>
  )
}



export default Button