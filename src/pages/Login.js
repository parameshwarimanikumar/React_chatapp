import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';  // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            console.log('Response Status:', response.status);
            console.log('Response Headers:', response.headers);
            const data = await response.json();
            console.log('Response Data:', data);

            if (response.ok) {
                console.log('Login successful');
                // Store token and other user information
                localStorage.setItem('authToken', data.token);  // Adjust according to your API response
                localStorage.setItem('username', data.username); // Adjust according to your API response
                // Redirect or handle post-login actions
                navigate("/home");
            } else {
                console.log('Login failed:', data);
                // Display error message (assuming you have an error message state)
                setErrorMessage(data.error || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Display error message for network issues
            setErrorMessage("Login failed. Please check your connection.");
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="title">Login</span>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Login;
