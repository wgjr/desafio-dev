// src/components/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // You can reuse the App.css file for styling
import {Link} from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                username,
                email,
                password,
            });

            // Handle successful registration
            setSuccess('Registration successful!');
            setError('');
        } catch (err) {
            // Handle error
            setError('Failed to register. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                have an account? <Link to="/login">Login</Link>

                {success && <p className="success">{success}</p>}
            </form>
        </div>
    );
};

export default Signup;
