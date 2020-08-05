import React, { useState } from 'react';


const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const updateEmail = e => setEmail(e.target.value)
    const updatePassword = e => setPassword(e.target.value)
    const updateUsername = e => setUsername(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, username)
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