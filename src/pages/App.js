import './App.scss';
import Main from './Main';
import { useState, useEffect } from 'react';
import InGamePage from './InGamePage';

function App() {  

  const [screenNumber, setScreenNumber] = useState(1);  // 스크린 넘버 1이면 메인화면 2면 게임화면
  const screenNumberToggleHandler = (change) =>{ // 화면 체인지 하는 핸들러
      setScreenNumber(change);
  }
  
  // 스크린이 1이면 Main 아니면 InGame 화면
  if(screenNumber === 1)
  {
    return (
      <>
        <div className="App">
          <Main change ={screenNumberToggleHandler}  />
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
