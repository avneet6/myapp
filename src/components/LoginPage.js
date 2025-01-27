import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleLogin = async () => {
        if (email === 'admin@123.com' && password === 'admin@123') {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                setEmail('');
                setPassword('');
                setError(null);
                navigate('/dashboard');

            } catch (authError) {
                console.error(authError);
                setError('Authentication failed. Please try again.');
            }
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login Page</h2>

            <div className="input-group">
                <label>Email:</label><br />
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label>Password:</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </div><br />
            <button className="login-button" onClick={handleLogin} type="submit">Login</button>
            {error && <p>{error}</p>}

        </div>
    );
}

export default LoginPage;
