import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Message from './Message'
import { addMessage, postMessage } from '../actions/messages';

const PinChat = (props) => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState('')
    const messages = useSelector(state => state.msg)
    const { id } = useParams()
    const userId = useSelector(state => state.auth.id)
    const username = useSelector(state => state.auth.username)
    const updateInput = e => setInputValue(e.target.value)

    const webSocket = useRef(null);
    const ws = new WebSocket(`ws://localhost:8080/pins/${id}`);

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postMessage(id, userId, inputValue))
        const message = {
            type: 'chatMessage',
            data: {
                messageText: inputValue,
                username: username,
                userId: userId,
                pinId: id,
            }
        }
        ws.send(JSON.stringify(message))
        setInputValue('')
    }

    useEffect(() => {

        ws.onopen = (e) => {
            console.log(`open socket on id: ${id}`)
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
        ws.onclose = (e) => {
            console.log(`closed socket on id: ${id}`)
        }

        webSocket.current = {
            ws,
        };

        return function cleanup() {
            if (webSocket.current !== null) {
                webSocket.current.ws.close();
            }
        };
    }, [id]);

    return (
        <div className="column is-one-fifth">
            <div className="box">
                <div className="">
                    <h1>{props.location.title}:</h1>
                </div>
                <div>
                    {!messages ? null : messages.map((msg, i) => msg.pinId === id ? <Message username={msg.username} key={i} text={msg.messageText} /> : null)}
                </div>
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder={'yell'} value={inputValue} onChange={updateInput}></input>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}



export default PinChat;