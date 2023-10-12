import React from 'react'
import "./FindModal.scss";
import Button from '../button/Button';

const FindModal = ({click}) => {
    const clickModalFrameHandler = (event) =>{        
        if(event.target.className === 'find-modal-frame'){            
            click();
        }        
    }
  return (
    <div className='find-modal-frame' onClick={clickModalFrameHandler}>
        <div className='__body'>
            <div className='__title'>
                방 코드
            </div>
            <input className='__input' type='input'>
                
            </input>
            <Button title="확인" style="button6" event={click}/>
        </div>
    </div>
  )
}

export default FindModal;