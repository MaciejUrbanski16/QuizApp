import { useState, useEffect } from "react";

import './App.css';
import marks from './Page'
import React from 'react';


import Login from './Login';
import Registration from './Registration'
import Page from "./Page";
import Ranking from "./Ranking";

const getRankingUrl = 'http://localhost:3001/api/db/ranking/';

let fetchedRanking = [];

function App() {

  const [myBool, setmyBool] = useState(true);
  const [token, setToken] = useState();

  const [logged, setLogged] = useState(false);

  const [currentForm, setCurrentForm] = useState('login');
  const [rankingPage, setRankingPage] = useState(' ');
  const [rankingArray, setRankingArray] = useState([]);
  const [isFetched, setIsFetched] = useState(0);

  const [login, setLogin] = useState();

  function setRegisterForm() {
    setCurrentForm('register')
  }

  function setLoginForm() {
    setCurrentForm('login')
  }

  function setPageForm() {
    setCurrentForm('page')
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);



  function fetchData() {
    fetch(getRankingUrl)
      .then(response => response.json())
      .then(data => setData(data.response))
      .catch(error => console.log(error));
      setIsFetched(isFetched + 1)
      console.log("Ranking array in App.js: " + data);
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

                    <Login currentForm={currentForm} setCurrentForm={setCurrentForm} userLogin={login} setUserLogin={setLogin} data={data} setData={setData} />
                    <a className='registerLabel'>Don't you have account yet? - <button onClick={fetchData}>Register here!</button></a>
                    {isFetched === 2 ? (
                      <div>
                        Ranking
                        <ul>
                          {data.map((item) => (
                            <li key={item.login}>{item.login}</li>
                          ))}
                        </ul>
                      </div>
                    ) :
                      (
                        <div>
                          No ranking yet
                        </div>
                      )}
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
            {
              rankingPage === ' ' ? (
                <div>
                  <Page login={login} setRankingPage={setRankingPage} setRankingArray={setRankingArray} rankingArray={rankingArray} data={data} />
                  <br />
                </div>
              ) :
                (
                  <div>
                    <Ranking setRankingPage={setRankingPage} rankingArray={data} />
                  </div>
                )
            }
          </a>

      }
    </header>




  );
}

export default App;
