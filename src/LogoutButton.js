import React from 'react';

const LogoutButton = () => {

    const handleClick = () => {
        console.log("Handle logout button click")
    }

    return (
        <button className="logoutButton" onClick={handleClick}>
            LogouT
        </button>
    )
}

export default LogoutButton;