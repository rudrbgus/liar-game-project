import React from 'react';
import './RuleModal.scss';


const RuleModal = ({click}) => {
    const clickModalFrameHandler = (event) =>{
        console.log(event.target.className);
        if(event.target.className === 'modal-frame'){
            click();
        }
        
    }
    console.log("응애 나 애기 모달");
    return (
        <div className='modal-frame' onClick={clickModalFrameHandler}> 
            <div className='__body'>
                <div className='__content'>                    
                    <span className='title'>게임 설명</span>
                    <span><span className='blue'>참가자</span>들은 1명의 <span className='red'>라이어</span>와 나머지 참가자로 이루어집니다</span>    
                    <span>안뇽</span>
                </div>
            </div>
        </div>
    )
}

export default RuleModal;