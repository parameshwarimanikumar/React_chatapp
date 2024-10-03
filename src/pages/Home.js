import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import './home.css';

const Home = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    // Function to handle user selection from the Sidebar
    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="home">
            <div className="container">
                {/* Pass handleSelectUser to Sidebar */}
                <Sidebar onSelectUser={handleSelectUser} />

                {/* Pass the selectedUser to Chat */}
                <Chat selectedUser={selectedUser} />
            </div>
        </div>
    );
};

export default Home;
