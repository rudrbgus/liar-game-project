import './App.scss';
import Main from './Main';
import { useState, useEffect } from 'react';
import InGamePage from './InGamePage';
import axios from 'axios';


function App() {
  const [msg, setMsg] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:8181/hello')
      .then(res => setMsg(res.data))
  }); 

  const [screenNumber, setScreenNumber] = useState(1);  
  const screenNumberToggleHandler = (change) =>{
      setScreenNumber(change);
  }

  
  if(screenNumber === 1)
  {
    return (
      <>
        <div className="App">
          <Main change ={screenNumberToggleHandler}/>
        </div>        
      </>
    );
  }else if(screenNumber === 2){
    return(
      <>
        <InGamePage/>
      </>
    )
    }
  }

export default App;
