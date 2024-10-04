import React, { useState } from 'react';
import axios from 'axios';
import Attach from "../assets/Attach.png";
import Img from "../assets/Img.png";

const Input = ({ selectedUser }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null); // New state for file attachment

  const handleSendMessage = async () => {
    if (message.trim() || file) { // Check if message or file exists
      try {
        const token = localStorage.getItem('access_token');
        const formData = new FormData(); // Create FormData object
        
        formData.append('recipient_id', selectedUser.id); // Add recipient ID
        formData.append('content', message); // Add message content
        if (file) {
          formData.append('file', file); // Add the file if it exists
        }

        await axios.post('http://localhost:8000/api/messages/', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Set content type for FormData
          },
        });

        // Reset the input fields after sending
        setMessage('');
        setFile(null); // Clear the file after sending
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Update file state when a file is selected
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
        {/* Wrap the attach icon in a label for file opening */}
        <label htmlFor="file">
          <img src={Attach} alt="Attach file" />
        </label>
        <input type='file' style={{display: 'none'}} id='file' onChange={handleFileChange} />

        {/* Wrap image upload in label for file input */}
        <label htmlFor='file'>
          <img src={Img} alt='img' />
        </label>

        <button onClick={handleSendMessage}>Send</button> {/* Call the send function on button click */}
      </div>
    </div>
  );
};

export default Input;
