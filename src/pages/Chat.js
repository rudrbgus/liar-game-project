import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8181/ws');

    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      console.log('Received message:', message);
    };

    setWebSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (webSocket) {
      const message = { content: 'Hello, Server!' };
      webSocket.send(JSON.stringify(message));
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default WebSocketComponent;