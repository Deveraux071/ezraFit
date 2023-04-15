import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useDatabase } from '../contexts/auth-context';
import { useState } from 'react';
import { updateProfile } from 'firebase/auth'
import { getAuth } from 'firebase/auth';
import { ref, set } from "firebase/database";
import LoginRegisterForm from './login-register-form';

export default function RegisterForm( {formWidth} ) {
    const db = useDatabase();
    const auth = useAuth()
    const navigate = useNavigate();
    const [err, setErr] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();
        const name = first + ' ' + last
        await auth.register(email, pw).then(() => {
            updateProfile(getAuth().currentUser, { displayName: name }).then(() => {
                const userId = getAuth().currentUser.uid;
                set(ref(db, '/users/' + userId), {
                    username: name,
                    email: email
                });
                navigate('/login');
                }
            ).catch(() => {
                setErr('Failed to set name.')
                })
            }
        ).catch((err) => {
            setErr('Failed to create account. Try again.')
        })
    };

    const inputs = [
        {label: 'First Name:', id: 'first_name', onChange: setFirst},
        {label: 'Last Name:', id: 'last_name', onChange: setLast},
        {label: 'Email:', id: 'email', onChange: setEmail},
        {label: 'Password:', id: 'password', onChange: setPw, type:"password"},
    ]

    return (
        <LoginRegisterForm formWidth={formWidth} login={false} inputs={inputs} onSubmit={onSubmit} err={err}/>
    );
}
