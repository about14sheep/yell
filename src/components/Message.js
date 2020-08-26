import React from 'react';

const Message = (props) => {
    const { username, text } = props;

    return (
        <div>
            <p><span style={{ fontWeight: 'bold', color: '#A33DEA' }}>{`@${username}`}</span>{` ${text}`}</p>
        </div>
    )
}

export default Message;