import { useState } from "react";

import './App.css';
import marks from './Page'
import React from 'react';


import Login from './Login';
import Registration from './Registration'
import Page from "./Page";

function App() {

  const [myBool, setmyBool] = useState(true);
  const [token, setToken] = useState();

  const [logged, setLogged] = useState(false);

  const [currentForm, setCurrentForm] = useState('login')

  function setRegisterForm() {
    setCurrentForm('register')
  }

  function setLoginForm() {
    setCurrentForm('login')
  }

  function setPageForm() {
    setCurrentForm('page')
  }


  return (
    <header className="App-header">
      {
        currentForm === "login" || currentForm === "register" ? (
          <div className="App">


              <div id="loginForms">
                {
                  currentForm === "login" ? (
                    <a>
                      <Login currentForm={currentForm} setCurrentForm={setCurrentForm} />
                      <a className='registerLabel'>Don't you have account yet? - <button onClick={setRegisterForm}>Register here!</button></a>
                    </a>

                  ) :
                    (
                      <a>
                        <Registration />
                        <a className='registerLabel'>Do you have already account? - <button onClick={setLoginForm}  >Log in here!</button></a>
                      </a>

                    )
                }
              </div>





          </div>
        ) :
          <a>
            <Page />
            <br />
          </a>
      }
            </header>




  );
}

export default App;
