import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Message from './Message'
import { addMessage } from '../actions/messages';

const PinChat = () => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState('')
    const messages = useSelector(state => state.msg)
    const { id } = useParams()
    const username = useSelector(state => state.auth.username)
    let count = 0;
    const updateInput = e => setInputValue(e.target.value)

    const webSocket = useRef(null);
    const ws = new WebSocket(`ws://localhost:8080/pins/`);

    const handleClick = (e) => {
        e.preventDefault()
        const message = {
            type: 'chatMessage',
            data: {
                messageText: inputValue,
                username: username,
                pinId: id,
            }
        }
        ws.send(JSON.stringify(message))
        setInputValue('')
    }

    useEffect(() => {

        ws.onopen = (e) => {
            const msg = {
                type: 'SEND_USERS',
                data: {
                    pinId: id,
                }
            }
            ws.send(JSON.stringify(msg))
        };

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data).data
            dispatch(addMessage(message))
        };

        ws.onerror = (e) => {
            console.error(e);
        };

        webSocket.current = {
            ws,
        };

        return function cleanup() {
            if (webSocket.current !== null) {
                webSocket.current.ws.close();
            }
        };
    }, [webSocket]);

    return (
        <div>
            {!messages ? null : messages.map(msg => msg.pinId === id ? <Message username={msg.username} key={count++} text={msg.messageText} /> : null)}
            <form onSubmit={handleClick}>
                <input type="text" placeholder={'yell'} value={inputValue} onChange={updateInput}></input>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}



export default PinChat;