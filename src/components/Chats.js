import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chats = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Without token handling
        const response = await axios.get('http://localhost:8000/api/users/');
        console.log('API Response:', response.data); // Add this line
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.detail : error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='chats'>
      {error && <p className='error'>Error: {error}</p>}
      {users.length === 0 && !error ? (
        <p>No users found.</p>
      ) : (
        users.map(user => (
          <div className='userChat' key={user.id}>
            <div className='userChatInfo'>
              <img 
                src={user.profile_picture || '/assets/default-avatar.jpeg'} 
                alt={user.username} 
                className='userChatImg'
              />
              </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Chats;
