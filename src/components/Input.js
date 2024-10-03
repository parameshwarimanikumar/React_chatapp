import React, { useState } from 'react';
import axios from 'axios';
import Attach from "../assets/Attach.png";
import Img from "../assets/Img.png";

const Input = ({ selectedUser }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (message.trim() && selectedUser) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.post('http://localhost:8000/api/messages/', {
          recipient_id: selectedUser.id, // Pass the selected user ID
          content: message, // Use 'content' for the message body
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessage(''); // Clear the input field after sending
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="input">
      <input
        type='text'
        placeholder='Type your messages here...'
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Update message state on input change
      />
      <div className='send'>
        <img src={Attach} alt="Attach file" />
        <input type='file' style={{display: 'none'}} id='file' />
        <label htmlFor='file'>
          <img src={Img} alt='img' />
        </label>
        <button onClick={handleSendMessage}>Send</button> {/* Call the send function on button click */}
      </div>
    </div>
  );
};

export default Input;
