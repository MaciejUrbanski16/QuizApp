import './App.css';
import React from 'react';
import PropTypes from 'prop-types';

import axios from './api/axios'

import { useState } from "react";



const registerUrl = 'api/register';

const Registration = () => {

    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        
        e.preventDefault();

        console.log(login, email, password)

        try{
            const response = await axios.post(registerUrl, JSON.stringify({
                login,
                email,
                password
            }), 
            {
                headers: { 'Content-Type': 'application/json',
                
                }
            }
            )

            console.log(response.data)
            console.log(response.accessToken)
            console.log(JSON.stringify(response))

            //setSuccess(true)
            //clear forms
        }
        catch(err){
            if(!err?.response){
                console.log('No internet connection')
            }
            else if(err.response?.status === 409){
                console.log('User name taken')
            }
            else {
                console.log('Registration failed')
            }

        }
    }

    return (
        <form className='loginForm' onSubmit={handleSubmit}>
            <label className='loginLabels'>
                Login:
                <input id="login" type="text" onChange={(e) => setLogin(e.target.value)} /><br />

            </label>

            <label className='loginLabels'>
                Email:
                <input id="login" type="text" onChange={(e) => setEmail(e.target.value)} /><br />

            </label>

            <label className='loginLabels'>
                Password:
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

            </label>
            <input className="submit" type="submit" value="Register" /><br /><br />
            
        </form>
    );
}
export default Registration;
