import React from 'react';

const Message = (props) => {
    const { username, text } = props;

    return (
        <div>
            <p>{`${text} : ${username}`}</p>
        </div>
    )
}

export default Message;