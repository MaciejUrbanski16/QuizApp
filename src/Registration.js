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

    const [validEntries, setValidEntries] = useState(0);

    const handleSubmit = async e => {
        
        e.preventDefault();

        console.log(login, email, password)
        if(login.length < 6)
        {
            console.log("Too short login - at least 6 characters");
            return;
        }
        else if(login.length > 24){
            console.log("Too long login - at most 24 characters");
            return;
        }
        if(email.length < 6)
        {
            console.log("Too short email - at least 6 characters");
            return;
        }
        else if(email.length > 24){
            console.log("Too long email - at most 24 characters");
            return;
        }
        if(password.length < 6)
        {
            console.log("Too short password - at least 6 characters");
            return;
        }
        else if(password.length > 24){
            console.log("Too long password - at most 24 characters");
            return;
        }

        setValidEntries(1);

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
