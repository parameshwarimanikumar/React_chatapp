import React from 'react';
import Cam from '../assets/Cam.jpg';  
import Add from '../assets/Add.png';
import More from '../assets/More.png';

import Messages from './Messages';  // Assuming these exist
import Input from './Input';  

const Chat = ({ selectedUser = null }) => {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        {selectedUser ? <span>Chat with {selectedUser.username}</span> : <span>No user selected</span>}
        <div className='chatIcons'>
          <img src={Cam} alt="Camera" />
          <img src={Add} alt="Add" />
          <img src={More} alt="More" />
        </div>
      </div>

      <Messages />  {/* Messages between current user and selected user */}
      <Input />  {/* Input for sending messages */}
    </div>
  );
};

export default Chat;