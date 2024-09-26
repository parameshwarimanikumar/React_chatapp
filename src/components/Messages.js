import React from 'react';
import Message from './Message';

const Messages = ({ selectedUser }) => {
  return (
    <div className='messages'>
      {selectedUser ? (
        <>
          <h2>Chat with {selectedUser.username}</h2>
          {/* Render the messages here */}
          {/* Replace with actual message data */}
          <Message />
          <Message />
        </>
      ) : (
        <p>Please select a user to start chatting</p>
      )}
    </div>
  );
};

export default Messages;
