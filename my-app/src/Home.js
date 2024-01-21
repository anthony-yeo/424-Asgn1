import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Home = () => {

    const navigate = useNavigate();

    const { value } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState('');

    const handleNewAccount = () => {
        navigate('/NewAccount');
    }

    const checkAuth = async() => {
        try {
            const response = await axios.get('https://localhost:8000/checkauth', {
                withCredentials: true
            });

            console.log(response);

            if (response.status === 200){
                value.onLogin();
            }
        } catch (error) {
            console.log("User is not authenticated");
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    const handleSignIn = async() => {
        try {
            const response = await axios.post('https://localhost:8000/login',{
                user: username, 
                pass: password
            }, {
                withCredentials: true
            });
        
            if (response.status === 200){
                value.onLogin();
            } else {
                alert('Invalid Login');
            }
        } catch (error) {
            if (error.response && error.response.status === 401){
                alert('Invalid Login');
            } else {
                alert('Something went wrong');
            }
        }
    }

    return (
        <>
            <h2>Home (Public)</h2>

            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="password">Password </label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={() => setShowPassword(prevShowPassword => !prevShowPassword)}
                    type="button">
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>

            <button type="button" onClick={handleSignIn}>
                Sign In
            </button>

            <button type="button" onClick={handleNewAccount} style={{ marginLeft: '10px' }}>
                Create New Account
            </button>

        </>

    );
};