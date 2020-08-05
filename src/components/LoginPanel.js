import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions/authentication';

const LoginPanel = () => {
    const [email, setEmail] = useState('a@a.com');
    const [password, setPassword] = useState('password');
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);

    if (token) {
        return <Redirect to='/pins' />;
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder={email} value={email} onChange={updateEmail} />
                <input type='password' placeholder={password} value={password} onChange={updatePassword} />
                <button type="submit">Login</button>
            </form>
        </main>
    )
}

export default LoginPanel;