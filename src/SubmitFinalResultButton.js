import React, { useState } from 'react';
import axios from './api/axios';

const storeNewRankingEntryUrl = 'api/db/ranking/storeNewRankingEntry';
const getRankingUrl = 'api/db/ranking/';

const SubmitFinalResultButton = ({ login, correctAnswers, time, totalQuestions }) => {

    const [rankingArray, setRankingArray]  = useState([]);    

    const handleClick = async () => {
        console.log("handle submit final result button click")
        console.log("From page: login: ", login, " correctanswers: ", correctAnswers, " time: ", time, " totalQQuestions: ", totalQuestions)

        // e.preventDefault();

        // console.log(login, email, password)

        try {
            const response = await axios.post(storeNewRankingEntryUrl, JSON.stringify({
                login,
                correctAnswers,
                time,
                totalQuestions
            }),
                {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }
            )

            console.log("Response after uloading new ranking entry: ", response.data)
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

        console.log("handle ranking button click")
        // TODO show page with ranking

        try {
            const response = await axios.get(getRankingUrl,
                {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }
            )

            const data = response.data;
            const singleData = data[0]
            console.log("Data read from server: ", data);
            setRankingArray(rankingArray => [...rankingArray, data[0]]);
            console.log("Response data in usestate after get ranking: ", rankingArray);
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

    return (
        <button className="submitFinalResultButton" onClick={handleClick}>
            Submit Final Result
        </button>
    )
}
export default SubmitFinalResultButton;