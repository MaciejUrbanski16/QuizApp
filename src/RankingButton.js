import React from 'react';

const RankingButton = () => {

    const handleClick = () => {
        console.log("handle ranking button click")
        // TODO show page with ranking
    }

    return (
        <button className="rankingButton" onClick={handleClick}>
            Ranking
        </button>
    )
}

export default RankingButton;