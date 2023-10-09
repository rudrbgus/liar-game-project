import React from 'react';
import './Main.scss';
import Button from '../components/button/Button';
import Title from '../components/title/Title';

const Main = () => {
  const clickButtonHandler123 = () =>{
    console.log("누름");
  }
  
  return (
    <div className='main'>
      <Title title="라이어 게임"/>
      <Button title="게임 시작" type ={1}/>
      <Button title="게임 방법" type ={2}/>
    </div>
  )
}

export default Main