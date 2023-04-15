import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/auth-context";
import { useState } from 'react';
import LoginRegisterForm from './login-register-form';

export default function LoginForm( {formWidth} ) {
    const auth = useAuth()
    const navigate = useNavigate();
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const onSubmit = async (e) => {
        e.preventDefault();
        setErr('')
        setLoading(true)
        await auth.login(email, pw).then(() => {
            localStorage.setItem('password', pw)
            navigate('/account');
            setLoading(false)
        }).catch(() => {
            setErr('Incorrect email or password.')
        })
    };

    const inputs = [
        {label: 'Email:', id: 'email', onChange: setEmail},
        {label: 'Password:', id: 'password', onChange: setPw, type: 'password'},
    ]

    return (
        <LoginRegisterForm formWidth={formWidth} login={true} inputs={inputs} onSubmit={onSubmit} err={err} loading={loading}/>
    );
}
