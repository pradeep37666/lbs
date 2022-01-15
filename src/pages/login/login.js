import React, { useState, useEffect } from 'react';
import './login.css'
import PageWrapper from "../../components/pageWrapper/pageWrapper.js";
import { ReactComponent as Logo } from './../../assets/Logos/LogoRed.svg';
import { Link } from 'react-router-dom';
import Instance from '../../util/axios';
import { useHistory } from 'react-router-dom';
import ValidationPopup from '../../components/ValidationPopup/ValidationPopup';
import useGlobalState from '../../util/useGlobalState';
import { CometChat } from '@cometchat-pro/chat';
import { isMobile } from 'react-device-detect';
import { CircularProgress } from '@material-ui/core';
import { loginConstraints } from '../../util/validationConstraints';
import ValidationTextInput from '../../components/FormComponents/ValidationTextInput';
import { validate } from 'validate.js';
import Button from '../../components/Button/Button';

export default function Login() {
    const { dispatch } = useGlobalState()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({})
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const [loginError, setLoginError] = useState("")

    const handleSubmit = async (e) => {
        const valid = validateInputs()
        if(!valid) return 
        await setupCometChat()
        setIsLoading(true)
        try{
            e.preventDefault()
            const response = await Instance.post('/auth/signIn', {
                email: email,
                password: password
            })
            await cometChatLogin(response.data.user)
            setLoginError("")
            localStorage.setItem('token', response.data.token.accessToken)
            dispatch({ type: 'setUser', data: response.data.user })
        }catch(error){
            console.log(error)
            setLoginError("An error occurred whilst logging in, please try again")
            setIsLoading(false)
        } 
    }
    const setupCometChat = async () => {
        const appId = process.env.REACT_APP_CHAT_APP_ID
        let cometChatSettings = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('us').build();
        const res = await CometChat.init(appId, cometChatSettings)
      }


    const cometChatLogin = async (user) => {
        try{
            const User = await  CometChat.login(user.id, process.env.REACT_APP_CHAT_AUTH_KEY)
        } catch(e) {
            console.log('a', e)
            throw new Error
        }
    }

    useEffect(() => {
        if(Object.keys(errorMessages).length > 0){
            const valid = validateInputs()
            if(valid){
                setErrorMessages({})
                return
            }
        }
    },[email, password])

    const getErrorMessage = (inputName) => {
        if(Object.keys(errorMessages).length === 0) return null
        for(const key in errorMessages){
            if(Object.keys(errorMessages)[0] === inputName) return errorMessages[key][0]
        }
    }

    const validateInputs = () => {
        const validationErrors = validate({ email, password }, loginConstraints)
        if(validationErrors){
            setErrorMessages(validationErrors)
            return false
        }
        setErrorMessages({})
        return true
    }

    return (
        <PageWrapper>

            <div className="LoginMain">
                <Logo />
                <div className="LoginText">Log in or create an account to start sharing and borrowing from Little Big Shed.</div>
                <div className="LoginHeader">Login</div>
                <form style={{ width: '100%' }} onSubmit={(e) => handleSubmit(e)}>
                    <ValidationTextInput 
                    placeholder="Email"
                    errorHeader="Invalid Email"
                    errorMessage={getErrorMessage('email')}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <ValidationTextInput 
                    placeholder="Password"
                    errorHeader="Invalid Password"
                    errorMessage={getErrorMessage('password')}
                    onChange={e => setPassword(e.target.value)}
                    passwordInput
                    />
                    <Button 
                    text="Login" 
                    isLoading={isLoading} 
                    errorMessage={loginError} 
                    onClick={(e) => handleSubmit(e)} 
                    />
                </form>
                <Link to="/forgotpassword">
                    <div 
                    className="LoginText" 
                    style={{ marginTop: '1rem' }} 
                    onClick={() => history}
                    >
                        Forgot password?
                        <span className="RetrieveLink"> Retrieve here</span>
                    </div>
                </Link>
                <Link to='/register' style={{ width: '100%' }}>
                    <button className="LoginFormButton LoginFormButtonInverted">Create Account</button>
                </Link>
            </div>
        </PageWrapper>
    )
}
