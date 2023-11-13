import './App.scss';
import Main from './Main';
import { useState, useEffect } from 'react';
import InGamePage from './InGamePage';
import axios from 'axios';


function App() {
  const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);
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
      <div>{hello}</div>
      </>
    );
  }else if(screenNumber === 2){
    return(
      <>
      <InGamePage/>
      <div>{hello}</div>
      </>
    )
    }
  }

export default App;
