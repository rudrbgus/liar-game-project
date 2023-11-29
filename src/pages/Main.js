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
    axios.post("http://localhost:8181/create-room")
        .then(res => { // 임의의 이름을 보내줌 서버에서
            console.log(res);
            console.log(res.data[0]);
            cookie.save("userId", res.data[0], { path: '/' });  // <- 그걸 클라이언트 쿠키에 저장
            console.log("쿠키에 저장된 이름: " + res.data[0]);
            cookie.save("roomCode", res.data[1]);
            console.log("쿠키에 저장된 방 코드: " + res.data[1]);
            return true; // 이 부분이 추가된 부분
        })
        .then((isClear)=>{
            change(2);
        });
    console.log("방만들기 버튼 누름");
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