import React, { useEffect, useState, useCallback } from 'react';
import Message from './Message';
import axios from 'axios';

const Messages = ({ selectedUser, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    if (selectedUser) {
      setLoading(true);
      setError(null);  // Reset error before making the request
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`http://localhost:8000/api/messages/${selectedUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        const errorMessage = error.response?.data?.detail || 'An error occurred while fetching messages.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  }, [selectedUser]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="messages">
      {selectedUser ? (
        <>
          <h2>Chat with {selectedUser.username}</h2>
          {loading ? (
            <p>Loading messages...</p>
          ) : error ? (
            <p className="error">Error: {error}</p>
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                isSentByCurrentUser={message.sender.id === currentUserId}
              />
            ))
          ) : (
            <p>No messages yet. Start chatting!</p>
          )}
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Messages;
