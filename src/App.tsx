import React from 'react';
import './App.css';
import ChatItem from './components/chat-item';
import MessagePane from './components/message-pane';
import { MessageType } from './contexts/modal.context';

function App() {
  let messagesData  = [
    {type: MessageType.text, text: "Hello hello oke."}, {type: MessageType.code, languague: "csharp", text: `private static bool CheckEntityHasInDb(OracleConnection connection, string clientCode, DateTime date)
    {
      using (var command = connection.CreateCommand())
      {
        command.CommandText = "SELECT COUNT(*) FROM table WHERE client_code = :clientCode AND date = :date";
        command.Parameters.Add("clientCode", OracleDbType.Varchar2).Value = clientCode;
        command.Parameters.Add("date", OracleDbType.Date).Value = date;
        return (int)command.ExecuteScalar() > 0;
      }
    }`}
  ];
  function handleSend(message : string) {
    console.log(message)
  }
  return (
    <div className="App">
      <div id="test">
        <ChatItem isOwner={true} messagesData={messagesData} avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXp3DxP80ArpRzsB0XWBG9Ow5GeuefbLrUHw&usqp=CAU" />
        <ChatItem isOwner={false} messagesData={messagesData} avatar="https://www.w3schools.com/w3images/avatar6.png" />
      </div>
      <MessagePane defaultMessage='Hello world' onSend={handleSend}/>
    </div>
  );
}

export default App;