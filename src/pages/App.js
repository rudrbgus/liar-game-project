import './App.scss';
import Header from '../components/header/Header';
import Main from './Main';
import { useState } from 'react';

function App() {
  const [screenNumber, setScreenNumber] = useState(1);  
  const screenNumberToggleHandler = (change) =>{
    
  }
  if(screenNumber === 1)
  {
    return (
      <div className="App">
        <Main/>
      </div>
    );
  }
  
}

export default App;
