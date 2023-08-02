import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userLoginRequest, userLoginFailure } from '../Action/index';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = ({ userLoginRequest, userLoginFailure }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        };



        // googal 
        // kaushik@222

        // instgaram & snepshot
        // valiya@222


        // linkdin
        // kaushik@link

        // semsang
        // Kaushik1.2@



        userLoginRequest(userData)
            .then((userlogin) => {
                console.log("🚀 ~ userlogin:", userlogin);
                if (userlogin.length) {
                    console.log("userlogin");
                    toast.success('Successfully login!')
                    setTimeout(() => {
                        navigate('/'); // Navigate to the home page
                    }, 2000); // 2 seconds delay
                    // Dispatch additional actions or perform other logic
                } else {
                    console.log("errorkkkkkkkkkkk");
                    toast.error('Login failed');
                    // Dispatch additional actions or perform other logic
                }

                // navigate('/'); // Navigate to the home page
            })
            .catch((error) => {
                setError(error.message);
                userLoginFailure(); // Dispatch the userLoginFailure action
            });
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
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
                <button type="submit">Login</button>
            </form>
            <Link to="/signup">Sign Up</Link>

            <Toaster />
        </div>
    );
};

export default connect(null, { userLoginRequest, userLoginFailure })(Login);
