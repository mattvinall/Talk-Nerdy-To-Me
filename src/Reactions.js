import React from 'react';

const Reactions = (props) => {
    return (
        <section className="reactions">
            <button onClick={props.handleLikes}><i className="icon like is-large"></i></button>
            <button onClick={props.handleDislikes}><i className="icon like is-large flip"></i></button>
        </section>
    );
};

export default Reactions;

