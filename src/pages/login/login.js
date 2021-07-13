import React, { useState } from 'react';
import './login.css';
import PageWrapper from "./../../components/pageWrapper/pageWrapper.js";
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import { Link } from 'react-router-dom';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <PageWrapper>

            <div className="LoginMain">
                <Logo />
                <div className="LoginText">Log in or create an account to start sharing and borrowing from Little Big Shed.</div>
                <div className="LoginHeader">Login</div>
                <form style={{width: '100%'}}>
                    <input type='text' placeholder='Username' className="LoginInput" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type='password' placeholder='Password' className="LoginInput" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type='submit' className="LoginFormButton">Log in</button>
                </form>
                <div className="LoginText">Forgot password?<span className="RetrieveLink"> Retrieve here</span></div>
                <Link to='/register' style={{width: '100%'}}>
                <button className="LoginFormButton LoginFormButtonInverted">Create Account</button>
                </Link>
            </div>
        </PageWrapper>
    )
}
