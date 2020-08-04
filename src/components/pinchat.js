import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPinChat } from '../actions/pins';
import { useParams } from 'react-router-dom';

const PinChat = () => {
    const webSocket = useRef(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [newMessageTime, setNewMessageTime] = useState(0)
    const pin = useSelector(state => state.current)

    useEffect(() => {
        dispatch(getPinChat(id))
    }, [dispatch, id]);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/pins/:id`);

        ws.onopen = () => {
            const message = {
                type: 'message',
                data: {
                    message: 'yehaw'
                }
            }
            ws.send(JSON.stringify(message))
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
    }, [newMessageTime]);

    if (!pin) {
        return null;
    }

    return (
        <div>
            <button onClick={() => setNewMessageTime(newMessageTime + 1)}>
                chat
            </button>
        </div>
    )
}

export default PinChat;