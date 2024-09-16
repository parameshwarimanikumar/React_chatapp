import React, { useState } from "react";
import axios from 'axios';

const UpdateProfilePicture = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [message, setMessage] = useState("");

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]); // Get the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!profilePicture) {
            setMessage("Please select a profile picture to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', profilePicture);  // Add the file to form data

        try {
            const response = await axios.patch('http://localhost:8000/api/profile-picture/', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Send JWT token for authentication
                    'Content-Type': 'multipart/form-data',  // Ensure proper content type
                }
            });

            if (response.status === 200) {
                setMessage("Profile picture updated successfully.");
            }
        } catch (error) {
            setMessage("Error updating profile picture.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleProfilePictureChange} 
                    required 
                />
                <button type="submit">Update Profile Picture</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateProfilePicture;
