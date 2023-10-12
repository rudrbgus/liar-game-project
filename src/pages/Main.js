import React, {useState} from 'react';
import './Main.scss';
import Button from '../components/button/Button';
import Title from '../components/title/Title';
import RuleModal from '../components/modal/RuleModal';
import  ReactDOM  from 'react-dom';
import MakeRoom from '../components/modal/MakeRoom';
import FindModal from '../components/modal/FindModal';

const Main = () => {
  const [start, setStart] = useState(false);
  const [make, setMake] = useState(false);
  const [find, setFind] = useState(false);
  const [isOpenHowButton, setIsOpenHowButton] = useState(false);  
  // 게임 시작 버튼을 누르면 실행되는 함수
  const clickStartButtonHandler = () =>{
    setStart(!start);    
  }
  const clickHowButtonHandler = () =>{
    setIsOpenHowButton(!isOpenHowButton);
  }
  const clickMakeRoomButtonHandler = () =>{    
    setMake(!make);
    console.log("방만들기 버튼 누름");
  }
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
          make && (
            ReactDOM.createPortal(<MakeRoom click={clickMakeRoomButtonHandler}/>, document.getElementById('overlay-root'))
          )
        }
        {
          find && (
            ReactDOM.createPortal(<FindModal click={clickFindRoomButtonHandler}/>, document.getElementById('overlay-root'))
          )
        }     
      </div>
    )
    }
  }
  




export default Main