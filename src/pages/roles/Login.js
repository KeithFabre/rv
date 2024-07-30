import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

function Login({ setLoggedIn, setUserRole }) {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { username, password });
            const token = response.data.access_token;
            const decoded = jwtDecode(token);
            localStorage.setItem('token', token);
            setUserRole(decoded.role);
            setMessage('Login successful');
            setLoggedIn(true);
        } catch (error) {
            setMessage('Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
