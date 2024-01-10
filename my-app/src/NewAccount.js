import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './NewAccount.css';

export const NewAccount = () => {

    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const navigate = useNavigate();

    const handleNewAccount = async() => {
        try {
            const response = await axios.post('http://localhost:8000/new',
                {
                    user: username, 
                    pass1: password1,
                    pass2: password2
                });
                
            console.log(response.status);
            if(response.status === 200){
                alert('Account Created');
                navigate('/home');
            } else {
                alert('Bad Password');
            }
        } catch (error) {
            if (error.response && error.response.status === 400){
                alert("Password not strong enough");
            } else if (error.response && error.response.status === 422){
                alert("Passwords don't match");
            } else if (error.response && error.response.status == 409) {
                alert("Username in use")
            }else {
                alert("Something went wrong");
            }
        }
    }

    return (
        <>
            <h2>Create New Account</h2>

            <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div className='form-group'>
                <label htmlFor='password1'>Password</label>
                <input type='text' id='password1' value={password1} onChange={(e) => setPassword1(e.target.value)}/>
            </div>

            <div className='form-group'>
                <label htmlFor='password2'>Confirm Password</label>
                <input type='text' id='password2' value={password2} onChange={(e) => setPassword2(e.target.value)}/>
            </div>

            <button type='button' onClick={handleNewAccount}>
                Create Account
            </button>
        </>
    )
}