import './App.scss';
import Main from './Main';
import { useState, useEffect } from 'react';
import InGamePage from './InGamePage';

function App() {  

  const [screenNumber, setScreenNumber] = useState(1);  // 스크린 넘버 1이면 메인화면 2면 게임화면
  const screenNumberToggleHandler = (change) =>{ // 화면 체인지 하는 핸들러
      setScreenNumber(change);
  }


  const connect = () => {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/messages', function (response) {
      showMessage(JSON.parse(response.body).content);
      });
    });
  }

  const showMessage = (message) => {
    // 메시지를 처리하는 로직
    console.log('Received: ' + message);
}

  const sendMessage= () => {
    const message = { content: $('#message').val() };
    stompClient.send("/app/chat", {}, JSON.stringify(message));
}
  
  // 스크린이 1이면 Main 아니면 InGame 화면
  if(screenNumber === 1)
  {
    return (
      <>
        <div className="App">
          <Main change ={screenNumberToggleHandler}  />
          <button onclick="sendMessage()">Send</button>
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
