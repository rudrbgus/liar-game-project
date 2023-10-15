import './App.scss';
import Header from '../components/header/Header';
import Main from './Main';
import { useState } from 'react';
import InGamePage from './InGamePage';

function App() {
  const [screenNumber, setScreenNumber] = useState(1);  
  const screenNumberToggleHandler = (change) =>{
      setScreenNumber(change);
  }

  
  if(screenNumber === 1)
  {
    return (
      <div className="App">
        <Main change ={screenNumberToggleHandler}/>
      </div>
    );
  }else if(screenNumber === 2){
    return(
      <InGamePage/>
    )
  }
  
}

export default App;
