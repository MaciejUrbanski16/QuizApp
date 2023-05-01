import React from 'react';
import axios from './api/axios';
import { useState, useEffect } from "react";

const getRankingUrl = 'api/db/ranking/';

const RankingButton = ({ setRankingPage, setRankingArray, rankingArray }) => {

    const [handleTimes, setHandleTimes] = useState(0);
    const [ranking, setRanking] = useState([]);

    const readRanking = async () => {
        let responseData = []
        setRankingPage('ranking');



        try {
            const response = await axios.get(getRankingUrl,
                {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }
            )

            responseData = response.data;


            console.log("Data read from server: ", responseData);

            setRanking(responseData);
            //rankingArray.push(singleData);
            console.log("Response data in usestate after get ranking in Ranking: ", ranking);
            // console.log(response.accessToken)
            // console.log(JSON.stringify(response))


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

    const handleClick = async () => {
        console.log("handle ranking button click")
        // if(handleTimes === 1)
        // {
        //     setRankingPage('ranking');
        //     setHandleTimes(0);
        // }
        setHandleTimes(handleTimes + 1);
        setRankingPage('ranking');
        setHandleTimes(0);
        readRanking()

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
            setRankingArray(response.data);



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
        console.log("Ranking array after read from server: " + rankingArray[0])
    }

    // useEffect(() => {
    //     readRanking()
    // }, [])

    return (
        <button className="rankingButton" onClick={handleClick}>
            Ranking
        </button>
    )
}

export default RankingButton;