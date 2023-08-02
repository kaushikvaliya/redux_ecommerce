// components/Signup.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userSignupRequest, userSignupFailure } from '../Action/index';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';





const Signup = ({ userSignupRequest, userSignupFailure }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        };
        userSignupRequest(userData)
            .then((response) => {
                console.log("🚀 ~ response:", response)
                toast.success('Successfully toasted!')
                setTimeout(() => {
                    navigate('/'); // Navigate to the home page
                }, 2000); // 2 seconds delay

            })
            .catch((error) => {
                userSignupFailure(error.message);
                toast.error('Signup failed');
            });

    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    required
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
                <Toaster />
            </form>
            <Link to="/login">Back</Link>
        </div>
    );
};

export default connect(null, { userSignupRequest, userSignupFailure })(Signup);
