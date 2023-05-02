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

    const [rankingType, setRankingType] = useState("ogólny");

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

    const handleSelectRankingType = () => {

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