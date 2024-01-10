import { useState } from "react";
import { useAuth } from "./context/AuthProvider";

export const Home = () => {
    const { value } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logins = [
        { username: 'user1', password: 'pass1'},
        { username: 'user2', password: 'pass2'},
    ]

    const handleSignIn = () => {
        const isValidUser = logins.some(creds => creds.username === username && creds.password === password);

        if (isValidUser){
            value.onLogin();
        } else {
            alert('Invalid login');
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
        </>
    );
  };