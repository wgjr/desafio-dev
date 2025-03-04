import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setToken} from '../redux/authSlice';
import axios from 'axios';
import '../App.css';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook para navegação programática

    const handleRedirect = () => {
        navigate('/upload'); // Redireciona para a rota /upload
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                email,
                password,
            });

            const {access_token, email: userEmail} = response.data;

            // Save the token and email in Redux
            dispatch(setToken({token: access_token, email: userEmail}));

            // Clear error if successful
            setError('');

            handleRedirect()
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </form>
        </div>
    );
};

export default Login;