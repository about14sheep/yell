import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPinMessages, postMessage } from '../actions/messages';
import Message from './Message'

const PinChat = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('')
    const { id } = useParams()
    const userId = useSelector(state => state.auth.id)
    const msgList = useSelector(state => state.pin.msgList)

    const updateInput = e => setInputValue(e.target.value)

    const webSocket = useRef(null);
    const ws = new WebSocket(`ws://localhost:8080/pins/`);


    const handleClick = (e) => {
        e.preventDefault()
        const message = {
            type: 'chatMessage',
            data: {
                message: inputValue,
                userId: userId,
                pinId: id,
            }
        }
        ws.send(JSON.stringify(message))
        setInputValue('')
    }

    useEffect(() => {

        ws.onopen = (e) => {
            console.log('socket open')
            const msg = {
                type: 'SEND_USERS',
                data: {
                    pinId: id,
                    userId: userId
                }
            }
            ws.send(JSON.stringify(msg))
        };

        ws.onmessage = (e) => {
            console.log(JSON.parse(e.data).data.message);
        };

        ws.onerror = (e) => {
            console.error(e);
        };

        ws.onclose = (e) => {
            const message = {
                type: 'close',
                data: {
                    userId: userId,
                    pinId: id
                }
            }
            ws.send(JSON.stringify(message))
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

    const sendMsg = e => {
        e.preventDefault()
        dispatch(postMessage(id, userId, inputValue))
        setInputValue('')
    }

    useEffect(() => {
        dispatch(getPinMessages(id))
    }, [dispatch, id])

    return (
        <div>
            {!msgList ? null : msgList.map(msg => <Message key={msg.id} username={msg.User.username} text={msg.messageText} />)}
            <form onSubmit={handleClick}>
                <input type="text" placeholder={'yell'} value={inputValue} onChange={updateInput}></input>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}



export default PinChat;