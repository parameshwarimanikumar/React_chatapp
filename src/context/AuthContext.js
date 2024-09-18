// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch logged-in user's data
        const response = await axios.get('http://localhost:8000/api/current_user/'); // Adjust API endpoint
        setCurrentUser(response.data);  // Assuming the API response contains the user data
      } catch (error) {
        console.error('Error fetching current user:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.detail : error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
