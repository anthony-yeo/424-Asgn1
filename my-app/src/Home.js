import { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Home = () => {

    const navigate = useNavigate();

    const { value } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const logins = [
    //     { username: 'user1', password: 'pass1'},
    //     { username: 'user2', password: 'pass2'},
    // ]

    const handleNewAccount = () => {
        navigate('/NewAccount');
    }

    const handleSignIn = async() => {
        try {
            const response = await axios.post('https://lively-mushroom-0ca21ac1e.4.azurestaticapps.net/login',
                {user: username, pass: password});
            

            console.log(response.status);
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
                <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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