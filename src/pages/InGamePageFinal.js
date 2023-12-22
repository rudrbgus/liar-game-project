import React, { useEffect, useState } from 'react'
import UserBox from '../components/box/UserBox'
import axios from 'axios'
import RoomCodeButton from '../components/button/RoomCodeButton';
import "./InGamePageFinal.scss";

const InGamePageFinal = ({roomCode}) => {
    
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
    


  return (
    <>123</>

    // <div className='ingame-wrapper'>
    //     {/* 왼쪽 화면 */}
    //     <div className='user-box-left-part'>
    //         <UserBox userName={userList[0]} show={true} increase={increase} className="ingame-first-user-box"/>
    //         <UserBox userName={userList[1]} show={true} increase={increase} className="ingame-second-user-box"/>
    //         <UserBox userName={userList[2]} show={true} increase={increase} className="ingame-third-user-box"/>
    //         <UserBox userName={userList[3]} show={true} increase={increase} className="ingame-forth-user-box"/>
    //     </div>
    //     {/* 중앙 화면 */}
    //     <div className='chat-part'>
    //     <div className='role'>{role}</div>
    //     <div className='word'>{goalWord}</div>
    //       {/* 게임 상황 */}
    //       {isLoading?
    //         (<span className='__present-state'>{presentState}</span>)
    //         :
    //         (<span>...Loading</span>)
    //         }
    //         <div className='__chat-box'>
    //             <div className='__chatiing-box'>
    //             {/* 채팅 내용을 매핑하여 출력 */}
    //             {chatArray.map((chat, index) => (
    //                 <div key={index} className='__chat-item'>
    //                     <span className='__chat-user'>{chat.userName}:</span>
    //                     <span className='__chat-text'>{chat.userContext}</span>
    //                 </div>
    //                 ))
    //             }
    //             </div>
    //             <input
    //                 className='__chat-input'
    //                 value={userText}
    //                 onChange={(event) => setUserText(event.target.value)}
    //                 onKeyDown={enterUserText}
    //             />
    //         </div>
    //     </div>
    //     {/* 오른쪽 화면 */}
    //     <div className='user-box-right-part'>
    //         <UserBox userName={userList[4]} show={true} className="five-user-box"/>
    //         <UserBox userName={userList[5]} show={true} className="six-user-box"/>
    //         <UserBox userName={userList[6]} show={true} className="seven-user-box"/>
    //         <UserBox userName={userList[7]} show={true} className="eight-user-box"/>
    //   </div>
    // </div>
  )
}

export default InGamePageFinal