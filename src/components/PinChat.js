import React, { useEffect, useRef, useState } from 'react';
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

    const sendMsg = e => {
        e.preventDefault()
        dispatch(postMessage(id, userId, inputValue))
    }

    useEffect(() => {
        dispatch(getPinMessages(id))
    }, [dispatch])

    return (
        <div>
            {!msgList ? null : msgList.map(msg => <Message key={msg.id} username={msg.User.username} text={msg.messageText} />)}
            <form onSubmit={sendMsg}>
                <input type="text" placeholder={'yell'} value={inputValue} onChange={updateInput}></input>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

// const webSocket = useRef(null);
// const ws = new WebSocket(`ws://localhost:8080/pins/${id}`);


// const handleClick = (e) => {
//     const message = {
//         type: 'message',
//         data: {
//             message: inputValue
//         }
//     }
//     ws.send(JSON.stringify(message))
//     setInputValue('')
// }

// useEffect(() => {

//     ws.onopen = (e) => {
//         console.log('socket open')
//     };

//     ws.onmessage = (e) => {
//         console.log(JSON.parse(e.data).data.message);
//     };

//     ws.onerror = (e) => {
//         console.error(e);
//     };

//     ws.onclose = (e) => {
//         console.log(e);
//     };

//     webSocket.current = {
//         ws,
//     };

//     return function cleanup() {
//         if (webSocket.current !== null) {
//             webSocket.current.ws.close();
//         }
//     };
// }, [webSocket]);

export default PinChat;