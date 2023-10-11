import React, {useState} from 'react';
import './Main.scss';
import Button from '../components/button/Button';
import Title from '../components/title/Title';

const Main = () => {
  const [start, setStart] = useState(false);
  const clickStartButtonHandler = () =>{
    setStart(!start);
    console.log("스타트 버튼 누름");
  }

  if(!start){
    return (
      <div className='main'>
        <Title title="라이어 게임"/>
        <Button title="게임 시작" style ="button1" event = {clickStartButtonHandler}/>
        <Button title="게임 방법" style ="button2"/>      
      </div>
    )
  }
  if(start){
    return(
      <div className='main'>
        <Title title="라이어 게임"/>
        <Button title="방 만들기" style="button3"/>
        <Button title='방 찾기 ' style="button4"/>        
      </div>
    )
    }
  }
  




export default Main