import React, { useContext } from 'react';
import Cam from '../assets/Cam.jpg';  // Update paths as needed
import Add from '../assets/Add.png';
import More from '../assets/More.png';
import { AuthContext } from '../context/AuthContext';
import Messages from './Messages';
import Input from './Input';  // Make sure the component name starts with an uppercase letter

const Chat = () => {
  const { user, error } = useContext(AuthContext);

  return (
    <div className='chat'>
      <div className='chatInfo'>
        {error && <p className="error">Error: {error}</p>}
        <span>{user ? user.displayName : 'Guest'}</span> {/* Display the user's name or 'Guest' */}
        <div className='chatIcons'>
          <img src={Cam} alt="Camera" />
          <img src={Add} alt="Add" />
          <img src={More} alt="More" />
        </div>
      </div>
      
      <Messages />
      <Input /> {/* Use Input with an uppercase 'I' */}
    </div>
  );
};

export default Chat;
