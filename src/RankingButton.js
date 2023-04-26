import React from 'react';
import axios from './api/axios';

const getRankingUrl = 'api/db/ranking/';

const RankingButton = ({setRankingPage}) => {

    const handleClick = async ()  => {
        console.log("handle ranking button click")
        setRankingPage('ranking');
        // TODO show page with ranking

        try{
            const response = await axios.get(getRankingUrl,
            {
                headers: { 'Content-Type': 'application/json',
                
                }
            }
            )

            console.log("Response after get ranking: ", response.data)
            // console.log(response.accessToken)
            // console.log(JSON.stringify(response))


        }
        catch(err){
            if(!err?.response){
                console.log('No internet connection')
            }
            else if(err.response?.status === 409){
                console.log('User name taken')
            }
            else {
                console.log('Registration failed')
            }

            //errRef.current.focus()
        }
    }

    return (
        <button className="rankingButton" onClick={handleClick}>
            Ranking
        </button>
    )
}

export default RankingButton;