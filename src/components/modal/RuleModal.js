import React, { useState } from 'react';
import './RuleModal.scss';


const RuleModal = ({click}) => {
    const [Animation, setAnimation] = useState("__body mount");
    const clickModalFrameHandler = (event) =>{
        console.log(event.target.className);
        if(event.target.className === 'modal-frame'){
            setAnimation("__body unmount");
            setTimeout(click(), 2000);            
        }
        
    }    
    return (
        <div className='modal-frame' onClick={clickModalFrameHandler}> 
            <div className={Animation}>
                <div className='__content'>                    
                    <span className='title'>게임 설명</span>
                    <hr></hr>
                    <p>참가자 들은 똑같은 제시어를 받습니다 <br/>하지만 1명의 라이어는 제시어를 받지 못합니다<br/> 참가자들은 각자의 제시어를 설명해서<br/> 자신이
                    라이어가 아님을 밝히고 라이어는 <br/>자신이 라이어라는 사실을 들키지 않고 살아남는 게임입니다.                        
                    </p>                    
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default RuleModal;