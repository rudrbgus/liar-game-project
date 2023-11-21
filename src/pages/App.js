import './App.scss';
import Main from './Main';
import { useState, useEffect } from 'react';
import InGamePage from './InGamePage';
import axios from 'axios';


function App() {
  
  const [msg, setMsg] = useState([]);
  useEffect(()=>{ // 페이지가 열리면 하는 행동
    axios.get('http://localhost:8181/hello')
      .then(res => setMsg(res.data))
  }); 

  const [screenNumber, setScreenNumber] = useState(1);  // 스크린 넘버 1이면 메인화면 2면 게임화면
  const screenNumberToggleHandler = (change) =>{
      setScreenNumber(change);
  }
  
  
  const [roomCode, setRoomCode] = useState("방 코드");
  // 방 코드 가져오는 함수
  const getRoomCode = (roomCode) => { // 모달에서 방 코드 가져오는 함수
    setRoomCode(roomCode);
  }
  

  
  if(screenNumber === 1)
  {
    return (
      <>
        <div className="App">
          <Main change ={screenNumberToggleHandler}  getRoomCode={getRoomCode}/>
        </div>        
      </>
    );
  }else if(screenNumber === 2){
    return(
      <>
        <InGamePage roomCode={roomCode}/>
      </>
    )
    }
  }

export default App;
