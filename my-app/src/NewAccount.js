import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './NewAccount.css';

export const NewAccount = () => {

    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleNewAccount = async() => {
        try {

            if (!username.trim() || !password1.trim() || !password2.trim() || !phone.trim() || !email.trim()) {
                alert('Please fill out all fields.');
                return;
            }

            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            

            const response = await axios.post('https://localhost:8000/new',
                {
                    user: username, 
                    pass1: password1,
                    pass2: password2,
                    phone: phone,
                    email: email
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
            } else if (error.response && error.response.status === 409) {
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

            <div className='form-group'>
                <label htmlFor='phone'>Phone Number</label>
                <input type='text' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>

            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <button type='button' onClick={handleNewAccount}>
                Create Account
            </button>
        </>
    )
}