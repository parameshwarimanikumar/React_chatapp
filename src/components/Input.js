import React, { useState } from 'react';
import AttachIcon from '../assets/Attach.png'; // Ensure the correct relative path

const Input = ({ selectedUser, socket }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null); // State for the file
  const [preview, setPreview] = useState(null); // State for the file preview (image)

  // Convert the file to base64 if needed for WebSocket
  const handleFileUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file); // Convert to base64
    });
  };

  const handleSendMessage = async () => {
    // Check if selectedUser is defined
    if (!selectedUser) {
      console.error('No user selected!');
      return; // Exit early if no user is selected
    }

    if (message.trim() || file) { // Ensure there's content to send
      const messageData = {
        message,
        sender_id: localStorage.getItem('user_id'), // Current user's ID from localStorage
        recipient_id: selectedUser.id, // Target recipient's ID
      };

      // If a file is selected, handle the file upload
      if (file) {
        const fileData = await handleFileUpload(file);
        messageData.file = fileData; // Append the base64 encoded file
      }

      // Send message via WebSocket
      socket.send(JSON.stringify(messageData));

      // Reset input fields
      setMessage('');
      setFile(null);
      setPreview(null); // Reset the preview
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Store the selected file in state

    // Check if the selected file is an image
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const previewURL = URL.createObjectURL(selectedFile); // Create a local URL for image preview
      setPreview(previewURL);
    } else {
      setPreview(null); // No preview for non-image files
    }
  };

  return (
    <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ flexGrow: 1, marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      {/* Hidden file input */}
      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the default file input
      />

      {/* Label with attach icon as a file input trigger */}
      <label htmlFor="file-input">
        <img
          src={AttachIcon}
          alt="Attach"
          style={{ cursor: 'pointer', width: '24px', marginLeft: '10px' }} // Style for the attach icon
        />
      </label>

      {/* Conditionally render the image preview or file name */}
      {preview ? (
        <div className="preview" style={{ marginLeft: '10px' }}>
          <img src={preview} alt="Preview" style={{ maxHeight: '100px' }} />
        </div>
      ) : (
        file && <p style={{ marginLeft: '10px' }}>{file.name}</p> // Display the file name if not an image
      )}

      <button onClick={handleSendMessage} className="input-button">
  Send
</button>

    </div>
  );
};

export default Input;
