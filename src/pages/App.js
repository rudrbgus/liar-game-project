import './App.scss';
import Main from './Main';
import { useState, useEffect } from 'react';
import InGamePage from './InGamePage';
import axios from 'axios';


function App() {
  const [userName, setUserName] = useState("무명");
  const [msg, setMsg] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:8181/hello')
      .then(res => setMsg(res.data))
  }); 

  const [screenNumber, setScreenNumber] = useState(1);  
  const screenNumberToggleHandler = (change) =>{
      setScreenNumber(change);
  }

  // 이름 가져오는 함수
  const getUserName = (serverFromuserName) =>{
    setUserName(serverFromuserName);
  }
  

  
  if(screenNumber === 1)
  {
    return (
      <>
        <div className="App">
          <Main change ={screenNumberToggleHandler} getUserName={getUserName}/>
        </div>        
      </>
    );
  }else if(screenNumber === 2){
    return(
      <>
        <InGamePage name={userName}/>
      </>
    )
    }
  }

export default App;
