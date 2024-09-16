import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Assuming the username is stored in localStorage as 'registeredUsername' after registration
    const username = localStorage.getItem('registeredUsername');
    if (username) {
      setCurrentUser(username); // Set current logged-in user
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage and redirect to login page
    localStorage.removeItem('registeredUsername'); // Clear the username
    localStorage.removeItem('registeredEmail');
    localStorage.removeItem('registeredPassword');
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <div className='navbar'>
      <span className='logo'>Chat</span>
      <div className='user'>
        {/* Display the current username */}
        <span>{currentUser}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
