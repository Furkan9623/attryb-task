import React, { useState } from 'react';
import "../signin.css"

const SigninForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a user object with the form data
        const user = {
            email,
            password
        };

        try {
            // Send a POST request to the login endpoint
            const response = await fetch('http://localhost:8000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            // Handle the response
            if (response.ok) {
                // Login successful
                const data = await response.json();
                const { token } = data;

                // Store the token in localStorage
                localStorage.setItem('token', token);
                alert("User Logged in successfully")
                // Reset the form
                setEmail('');
                setPassword('');
                // Trigger the login success callback
                onLoginSuccess();
            } else {
                // Login failed
                alert('User login failed');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="signin-form">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default SigninForm;
