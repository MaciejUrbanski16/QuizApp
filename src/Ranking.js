import { useState, useEffect } from "react";
import Select, { components } from 'react-select'
import axios from './api/axios'

import './Ranking.css'

const getRankingUrl = 'http://localhost:3001/api/db/ranking/';

const options = [
    { value: 'geografia', label: 'Geografia', color: '#abcfca' },
    { value: 'fizyka', label: 'Fizyka', color: '#abcfcf' },
    { value: 'matematyka', label: 'Matematyka', color: '#abcfcf', fontColor: '#00ff00' }
];

const customStyles = {
    control: (base) => ({
      ...base,
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '600px'
    }),
    menu: (base) => ({
        ...base,  
        position: 'fixed',
        top: '130px',
        right: '20px',
        width: '600px'
      })
  };

const Table = ({ data }) => {

    const dataWithIndex = data.map((item, index) => {
        return {
          ...item,
          index: index + 1
        }
      });

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Pozycja</th>
                    <th>Login</th>
                    <th>Punkty</th>
                    <th>Czas</th>
                    <th>Dziedzina</th>
                </tr>
            </thead>
            <tbody>
            {dataWithIndex.map((item, index) => {
          if (index < 3) {
            return (
              <tr key={item.id} className="highlighted">
                <td>{item.index}</td>
                <td>{item.login}</td>
                <td>{item.correctAnswers}</td>
                <td>{item.time}</td>
                <td>Geografia</td>
              </tr>
            );
          } else {
            return (
              <tr key={item.id}>
                <td>{item.index}</td>
                <td>{item.login}</td>
                <td>{item.correctAnswers}</td>
                <td>{item.time}</td>
                <td>Geografia</td>
              </tr>
            );
          }
        })}
                
            </tbody>
        </table>
    );
};


const Ranking = ({ setRankingPage, rankingArray }) => {

    const [data, setData] = useState([]);

    const [rankingType, setRankingType] = useState("geografia");

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        // if(rankingType === "ogolny")
        // {
        // fetch(getRankingUrl)
        //     .then(response => response.json())
        //     .then(data => setData(data.response))
        //     .catch(error => console.log(error));
        // console.log("Ranking array in App.js: " + data);
        // }
        if(rankingType === "geografia")
        {
            fetch(getRankingUrl)
            .then(response => response.json())
            .then(data => setData(data.response))
            .catch(error => console.log(error));
            console.log("Geografia - Ranking array in App.js: " + data);
        }
        else if(rankingType === "fizyka")
        {
            fetch(getRankingUrl)
            .then(response => response.json())
            .then(data => setData(data.response))
            .catch(error => console.log(error));
            console.log("Fizyka - Ranking array in App.js: " + data);
        }
        else if(rankingType === "matematyka")
        {
            fetch(getRankingUrl)
            .then(response => response.json())
            .then(data => setData(data.response))
            .catch(error => console.log(error));
            console.log("Matemetyka - Ranking array in App.js: " + data);
        }
    }

    const handleSelectRankingType = async (selectedOption) => {
        console.log(`Option selected:`, selectedOption.value);
        setRankingType(selectedOption.value)
    }

    const handleClick = async () => {
        setRankingPage(' ');
    }

    return (
        <div className="table_container">
           
            <div className="ranking_head">Ranking {rankingType}
            <Select options={options} styles={customStyles} onChange={handleSelectRankingType} autoFocus={true} menuColor='red'/>
             </div><br/>

            <Table data={data} />

            <button onClick={handleClick}>Powrót</button>
        </div>
    )
}

export default Ranking;