import React, { useState } from 'react';
import "../signup.css"

const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password
        };

        try {
            // Send a POST request to the registration endpoint
            const response = await fetch('http://localhost:8000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                // Registration successful
                alert("User Logged in successfully")
                // Reset the form
                setName('');
                setEmail('');
                setPassword('');
            } else {
                // Registration failed
                console.error('User registration failed');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };


    return (
        <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
