import React, { useState, useEffect } from 'react';
import axios from './api/axios';

const storeNewRankingEntryUrl = 'api/db/ranking/storeNewRankingEntry';
const getRankingUrl = 'api/db/ranking/';

const SubmitFinalResultButton = ({
    login,
    setQuestionNumber,
    setSelectedCategory,
    setIsSubmitSelectCategory,
    correctAnswers,
    time,
    totalQuestions
                                }) => {

    const [handleTimes, setHandleTimes] = useState(0);

    const handleClick = async () => {
        console.log("handle submit final result button click")
        console.log("From page: login: ", login, " correctanswers: ", correctAnswers, " time: ", time, " totalQQuestions: ", totalQuestions)

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
        }
        if (handleTimes === 1) {
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