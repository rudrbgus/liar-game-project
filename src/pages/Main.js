import React from 'react';
import './Main.scss';
import StartButton from '../components/button/StartButton';

const Main = () => {
  return (
    <div className='main'>
      <StartButton title="게임 시작"/>
      <StartButton title="게임 방법"/>
    </div>
  )
}

export default Main