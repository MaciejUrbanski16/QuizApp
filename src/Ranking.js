import { useState, useEffect } from "react";
import axios from './api/axios'

import './Ranking.css'

const getRankingUrl = 'http://localhost:3001/api/db/ranking/';


const Ranking = ({ setRankingPage, rankingArray }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    function fetchData() {
      fetch(getRankingUrl)
        .then(response => response.json())
        .then(data => setData(data.response))
        .catch(error => console.log(error));
        console.log("Ranking array in App.js: " + data);
    }

    const handleClick = async () => {
        setRankingPage(' ');
    }

    return (
        <div>
            Ranking is: <br />
            Ranking
            <ul>
                {data.map((item) => (
                    <li key={item.login}>{item.login} Poprawnych odpowiedzi {item.correctAnswers}</li>
                ))}
            </ul>
            <div>

            </div>

            <button onClick={handleClick}>Powrót</button>
        </div>
    )
}

export default Ranking;