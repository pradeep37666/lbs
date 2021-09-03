import React, { useState } from 'react';
import './login.css';
import PageWrapper from "./../../components/pageWrapper/pageWrapper.js";
import { ReactComponent as Logo } from './../../assets/Logos/LogoRed.svg';
import { Link } from 'react-router-dom';
import Instance from '../../util/axios';
import { useHistory } from 'react-router-dom';
import ValidationPopup from '../../components/ValidationPopup/ValidationPopup';
import useGlobalState from '../../util/useGlobalState';
import { CometChat } from '@cometchat-pro/chat';

export default function Login() {
    const { dispatch } = useGlobalState()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    const [loginValidation, setLoginValidation] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        Instance.post('/auth/signIn', {
            email: email,
            password: password
        }).then((response) => {
            console.log(response)
            // Only log in if details are correct
            if (response.status === 404) {
                setLoginValidation("Incorrect username or password, please try again")
            } else if (response.status === 201) {
                // Add user to global state
                dispatch({ type: 'setUser', data: response.data.user })
                localStorage.setItem('token', response.data.token.accessToken)
                setLoginValidation("")
                history.push({ pathname: '/' })
            }
        })
            .catch((error) => {
                setLoginValidation("An error occurred whilst logging in, please try again")
                console.log(error)
            })
    }

    const cometChatLogin = async (user) => {
        try{
            const User = await  CometChat.login(user.id, process.env.REACT_APP_CHAT_AUTH_KEY)
            console.log(User, 'logged into comet chat')
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <PageWrapper>

            <div className="LoginMain">
                <Logo />
                <div className="LoginText">Log in or create an account to start sharing and borrowing from Little Big Shed.</div>
                <div className="LoginHeader">Login</div>
                <form style={{ width: '100%' }} onSubmit={(e) => handleSubmit(e)}>
                    <input type='text' placeholder='Email' className="LoginInput" value={email} onChange={(e) => {
                        setLoginValidation("")
                        setEmail(e.target.value)
                    }} />
                    <input type='password' placeholder='Password' className="LoginInput" value={password} onChange={(e) => {
                        setLoginValidation("")
                        setPassword(e.target.value)
                    }} />
                    <div className="LoginInputValidationContainer">
                        <button type='submit' disabled={!email || !password} className={`LoginFormButton ${!email || !password ? 'ButtonDisabled' : ''}`}>Log in</button>
                        <div className={`triangleLeft ${loginValidation.length === 0 ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={loginValidation} errorHeader='Invalid Login Details' hide={loginValidation.length === 0} />
                    </div>
                </form>
                <div className="LoginText">Forgot password?<span className="RetrieveLink"> Retrieve here</span></div>
                <Link to='/register' style={{ width: '100%' }}>
                    <button className="LoginFormButton LoginFormButtonInverted">Create Account</button>
                </Link>
            </div>
        </PageWrapper>
    )
}
