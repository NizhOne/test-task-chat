import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import ChatSpace from './Components/ChatSpace';
import socket from 'socket.io-client';

class App extends Component {


  render() {
    return (
      <div className="main-wrapper">
        <Header/>
        <ChatSpace />
      </div>
    );
  }
}

export default App;
