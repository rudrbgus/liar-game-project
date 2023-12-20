import React, {useState} from 'react';
import './Main.scss';
import Button from '../components/button/Button';
import Title from '../components/title/Title';
import RuleModal from '../components/modal/RuleModal';
import  ReactDOM  from 'react-dom';
import FindModal from '../components/modal/FindModal';
import axios from 'axios';
import cookie from 'react-cookies';

const Main = ({change}) => {
  const [start, setStart] = useState(false);
  const [find, setFind] = useState(false);
  const [isOpenHowButton, setIsOpenHowButton] = useState(false);  
  // 게임 시작 버튼을 누르면 실행되는 함수
  const clickStartButtonHandler = () =>{
    setStart(!start);    
  }
  // 게임 방법 버튼을 누르면 실행되는 함수
  const clickHowButtonHandler = () =>{
    setIsOpenHowButton(!isOpenHowButton);
  }
  // 방 만들기 버튼 누르면 실행되는 함수
  const clickMakeRoomButtonHandler = () =>{
    axios.post("http://localhost:8181/room")
      .then((res)=>{
        console.log("방 코드: "+res.data);
        cookie.save("roomId",res.data);
        change(2);
      });
  }
  // 방 찾기 버튼
  const clickFindRoomButtonHandler = () =>{
    setFind(!find);
    console.log("방 찾기 버튼 누름");
  }

  // 처음 시작 화면
  if(!start){
    return (
      <div className='main'>
        <Title title="라이어 게임"/>
        <Button title="게임 시작" style ="button1" event = {clickStartButtonHandler}/>
        <Button title="게임 방법" style ="button2" event = {clickHowButtonHandler}/>                  
        {
          isOpenHowButton && (
            ReactDOM.createPortal(<RuleModal click={clickHowButtonHandler}/>, document.getElementById('overlay-root'))
          )
        }      
      </div>      
    )
  }
  // 게임 시작 버튼 누르면 나오는 거 
  if(start){
    return(
      <div className='main'>
        <Title title="라이어 게임"/>
        <Button title="방 만들기" style="button3" event = {clickMakeRoomButtonHandler}/>
        <Button title='방 찾기 ' style="button4" event = {clickFindRoomButtonHandler}/>
        {
          find && (
            ReactDOM.createPortal(<FindModal click={clickFindRoomButtonHandler} change={change} />, document.getElementById('overlay-root'))
          )
        }     
      </div>
    )
    }
  }
  




export default Main