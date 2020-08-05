import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../actions/authentication';


const SignUp = () => {
    const [email, setEmail] = useState('')
    const [hashedPassword, setHashedPassword] = useState('')
    const [username, setUsername] = useState('')
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();

    const updateEmail = e => setEmail(e.target.value)
    const updatePassword = e => setHashedPassword(e.target.value)
    const updateUsername = e => setUsername(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(email, hashedPassword, username))
    }

    if (token) {
        return <Redirect to='/pins' />
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' onChange={updateUsername} />
                <input type="text" placeholder='Email' onChange={updateEmail} />
                <input type="password" placeholder='Password' onChange={updatePassword} />
                <button type='submit'>Create Account</button>
            </form>
        </main>
    )
}

export default SignUp;