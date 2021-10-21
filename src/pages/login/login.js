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
import { isMobile } from 'react-device-detect';
import { CircularProgress } from '@material-ui/core';

export default function Login() {
    const { dispatch } = useGlobalState()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)

    const [loginValidation, setLoginValidation] = useState("")

    const handleSubmit = async (e) => {
        setIsLoading(true)
        try{
            e.preventDefault()
            const response = await Instance.post('/auth/signIn', {
                email: email,
                password: password
            })
            await cometChatLogin(response.data.user)
            setLoginValidation("")
            localStorage.setItem('token', response.data.token.accessToken)
            dispatch({ type: 'setUser', data: response.data.user })
            // return
        }catch(error){
            setLoginValidation("An error occurred whilst logging in, please try again")
        } finally{
            setIsLoading(false)
        }
    }

    const cometChatLogin = async (user) => {
        try{
            const User = await  CometChat.login(user.id, process.env.REACT_APP_CHAT_AUTH_KEY)
            console.log(User, 'logged into comet chat')
        } catch(e) {
            throw new Error
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
                    <div className="LoginInputValidationContainer" style={isLoading ? { display: 'flex', justifyContent: 'center', height: 'max-content'} : null}>
                        {   isLoading ? (
                            <CircularProgress color="inherit" />
                        ) : (
                            <>
                                <button type='submit' disabled={!email || !password} className={`LoginFormButton ${!email || !password ? 'ButtonDisabled' : ''}`}>Log in</button>
                                { !isMobile && <div className={`triangleLeft ${loginValidation.length === 0 ? '' : 'ValidationTextHide'}`} /> }
                                { loginValidation && <ValidationPopup errorText={loginValidation} errorHeader='Invalid Login Details' hide={loginValidation.length === 0} /> }
                            </>
                        )
                            }
                    </div>
                </form>
                <div className="LoginText" style={{ marginTop: '1rem' }}>Forgot password?<span className="RetrieveLink"> Retrieve here</span></div>
                <Link to='/register' style={{ width: '100%' }}>
                    <button className="LoginFormButton LoginFormButtonInverted">Create Account</button>
                </Link>
            </div>
        </PageWrapper>
    )
}
