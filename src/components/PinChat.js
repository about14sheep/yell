import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const PinChat = () => {
    const webSocket = useRef(null);
    const [inputValue, setInputValue] = useState('')
    const { id } = useParams()
    const ws = new WebSocket(`ws://localhost:8080/pins/${id}`);


    const handleClick = (e) => {
        const message = {
            type: 'message',
            data: {
                message: inputValue
            }
        }
        ws.send(JSON.stringify(message))
        setInputValue('')
    }

    useEffect(() => {

        ws.onopen = (e) => {
            console.log('socket open')
        };

        ws.onmessage = (e) => {
            console.log(JSON.parse(e.data).data.message);
        };

        ws.onerror = (e) => {
            console.error(e);
        };

        ws.onclose = (e) => {
            console.log(e);
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
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
            <button onClick={handleClick}>
                chat
            </button>
        </div>
    )
}

export default PinChat;