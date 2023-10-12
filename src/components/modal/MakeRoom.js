import React, { useState } from 'react';
import "./MakeRoom.scss";
import RadioButton from '../button/RadioButton';
import Button from '../button/Button';

const MakeRoom = ({click}) => {
    const clickModalFrameHandler = (event) =>{        
        if(event.target.className === 'modal-frame'){            
            click();
        }        
    }
    const [clicked , setClicked] = useState(false);
    const clickRadioButtonHandler = () =>{
        setClicked(!clicked);
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
                    <Button title="방 만들기" style="button5" event={()=>{click()}} />
                </div>            
        </div>
  )
}

export default MakeRoom;