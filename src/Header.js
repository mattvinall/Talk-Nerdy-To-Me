import React from 'react';

const Header = (props) => {
    return (
        <header>
            <h1><span>🤓</span>Talk Nerdy To Me<span>🤓</span></h1>
            <div className="buttonContainer">
                <button type="button" className="btn" onClick={props.randomizeJoke}>Tell Me A Joke</button>
            </div>
        </header>
    );
};

export default Header;