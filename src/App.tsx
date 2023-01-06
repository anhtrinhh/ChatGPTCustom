import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChatItem from './components/chat-item';

function App() {
  return (
    <div className="App">
      <div id="test">
        <ChatItem isOwner={true} avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXp3DxP80ArpRzsB0XWBG9Ow5GeuefbLrUHw&usqp=CAU" />
        <ChatItem isOwner={false} avatar="https://www.w3schools.com/w3images/avatar6.png" />
      </div>
    </div>
  );
}

export default App;
