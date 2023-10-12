import React, { useState } from 'react'
import './Button.scss';
import ReactDOM from 'react-dom';
import RuleModal from '../modal/RuleModal';

const Button = ({title, style, event}) => {  
  const classStyle = style;  
    
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () =>{
    if(classStyle === "button2"){        
        setIsOpen(!isOpen);        
    }
    else
        event();
  }
  const clickExitHandler = () =>{
        setIsOpen(!isOpen);
  }

  return (
    <>
    <div className={classStyle} onClick={event} >
      <span>{title}</span>
    </div>       
    
    </>
  )
}



export default Button