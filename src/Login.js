import './App.css';
import React from 'react';
import PropTypes from 'prop-types';

import axios from './api/axios'

import { useState } from "react";



const loginUrl = 'api/login';

const getRankingUrl = 'api/db/ranking/';

const loggedSuccesful = <label>Login succesful</label>



const Login = ({currentForm, setCurrentForm, userLogin, setUserLogin, data, setData}) => {

    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [loginSuccess, setLogginSuccess] = useState(false);

    const [userHasAccount, setUserHasAccount] = useState(false)

    function displayLoginSuccess() {
        if (loginSuccess) {
            return (<a>Loggin success</a>)
        }
    }

    const handleClick = async () => {
        console.log("handle ranking button click")
        // if(handleTimes === 1)
        // {
        //     setRankingPage('ranking');
        //     setHandleTimes(0);
        // }
        //setHandleTimes(handleTimes + 1);
        //setRankingPage('ranking');
        //setHandleTimes(0);
        //readRanking()

        // TODO show page with ranking

        try {
            const response = await axios.get(getRankingUrl,
                {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }
            )

            console.log("Response after get ranking: ", response.data)
            // console.log(response.accessToken)
            // console.log(JSON.stringify(response))
            setData(response.data);



        }
        catch (err) {
            if (!err?.response) {
                console.log('No internet connection')
            }
            else if (err.response?.status === 409) {
                console.log('User name taken')
            }
            else {
                console.log('Registration failed')
            }

            //errRef.current.focus()
        }
        console.log("Ranking array after read from server in login.js: " + data)
    }

    const handleSubmit = async e => {

        e.preventDefault();

        console.log(login, email, password)
        setUserLogin(login);

        handleClick();

        try {
            const response = await axios.post(loginUrl, JSON.stringify({
                login,
                password
            }),
                {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }
            )
            

            // console.log(response.data)
            // console.log(response.accessToken)
            // console.log(JSON.stringify(response))

            if(response.data.message === "User not found!")
            {
                console.log("Wrong login or password")
            }
            else if (response.data.message === "Login successfully") {

            setLogginSuccess(true)
            setCurrentForm("page")
            //clear forms
            }
        }
        catch (err) {
            if (!err?.response) {
                console.log('No internet connection')
            }
            else if (err.response?.status === 409) {
                console.log('User name taken')
            }
            else {
                console.log('Registration failed')
            }

            //errRef.current.focus()
        }
    }



    return (
        <form className='loginForm' onSubmit={handleSubmit}>
            <label className='loginLabels'>

                Login:
                <input id="login" type="text" onChange={(e) => setLogin(e.target.value)} /><br />

            </label>

            <label className='loginLabels'>
                Password:
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

            </label>
            <input className="submit" type="submit" value="Login" /><br /><br />
        </form>
    );
}
export default Login;