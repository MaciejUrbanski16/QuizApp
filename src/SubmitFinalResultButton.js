import React, { useState, useEffect } from 'react';
import axios from './api/axios';

const storeNewRankingEntryUrl = 'api/db/ranking/storeNewRankingEntry';
const getRankingUrl = 'api/db/ranking/';

const SubmitFinalResultButton = ({ login, setQuestionNumber, setSelectedCategory, setIsSubmitSelectCategory, correctAnswers, time, totalQuestions }) => {

    const [rankingArray, setRankingArray] = useState([]);
    const [handleTimes, setHandleTimes] = useState(0);

    const handleClick = async () => {
        console.log("handle submit final result button click")
        console.log("From page: login: ", login, " correctanswers: ", correctAnswers, " time: ", time, " totalQQuestions: ", totalQuestions)

        // e.preventDefault();

        // console.log(login, email, password)
        let responseData = []

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

            responseData = response.data;


            console.log("Data read from server: ", responseData);

            setRankingArray(responseData);
            //rankingArray.push(singleData);
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
        if(handleTimes === 1){
            console.log("Before changing state to have new serie of uestions");
            setQuestionNumber(1);
            setIsSubmitSelectCategory(false);
            setHandleTimes(0);
            setSelectedCategory(' ');
        }
        setHandleTimes(handleTimes + 1);



    }

    useEffect(() => {
        handleClick()
    }, [])




    return (
        <button className="submitFinalResultButton" onClick={handleClick}>
            Submit Final Result
        </button>


    )
}
export default SubmitFinalResultButton;