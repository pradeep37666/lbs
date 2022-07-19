import { useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import Instance from '../../../../util/axios'
import ValidationTextInput from '../../../../components/FormComponents/ValidationTextInput'
import Button from '../../../../components/Button/Button'
import useGlobalState from '../../../../util/useGlobalState'
import EditIcon from '../../../../assets/Icons/EditIcon'
import './StripeAccountDetails.css'
import Arrow from '../../../../assets/Icons/Arrow'
import { CircularProgress } from '@material-ui/core'
import { SNACKBAR_BUTTON_TYPES } from '../../../../assets/Data/LBSEnum'
import useErrorState from '../../../../util/reducers/errorContext'

export default function AccountDetails() {
    const { state } = useGlobalState()
    const { user } = state
    const { errorDispatch } = useErrorState()
    const [ isEditingAccount, setIsEditingAccount ] = useState(false)
    const [ isUpdateAccountLoading, setIsUpdateAccountLoading ] = useState(false)
    const [ updateAccountError, setUpdateAccountError ] = useState()
    const [ accountDetails, setAccountDetails] = useState()
    const [ accNumber, setAccNumber ] = useState()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ bsb, setBsb ] = useState()

    const stripe = useStripe()

    useEffect(() => {
        getAccountDetails()
    }, [])

    const getAccountDetails = async () => {
        setIsEditingAccount(false)
        try{
            setIsLoading(true)
            const { data, status } = await Instance.get('/stripe/connect-account')
            if (status !== 200) return
            const { last4, routing_number } = data
            setAccountDetails({ last4, routing_number })
        } catch(err) {
            console.log(err.response)
        } finally {
            setIsLoading(false)
        }
    }

    const createUpdateAccountToken = async () => {
        try{
            const response = await stripe.createToken('bank_account', {
                country: 'nz',
                currency: 'nzd',
                routing_number: bsb,
                account_number: accNumber,
                account_holder_type: 'individual',
                account_holder_name: user.fullName,
            })
            if(response.token){
                setUpdateAccountError('')
                return response.token
            } else {
                setUpdateAccountError('Invalid bsb or account number')
            }
        } catch(err){
            setUpdateAccountError('Something went wrong')
        } 
    }

    const updateAccountDetails = async () => {
        setIsUpdateAccountLoading(true)
        const token = await createUpdateAccountToken()
        try{
            await Instance.patch('/stripe/connect-account', { token: token.id })
            await getAccountDetails()
        } catch(error){
            console.log(error.response)
            const messageType = error?.response?.data?.message?.split(':')[0]
            if (messageType === 'Invalid request to stripe') {
                errorDispatch({type: 'openSnackBar', data: {
                    message: 'Invalid bank infomation. Please check your bank details and try again.',
                    btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
                    btnFunc: () => errorDispatch({type: 'closeSnackBar'})
                }})
            }
        } finally{
            setIsUpdateAccountLoading(false)
        }
    }

    const getAccountDetailsIcon = () => {
        return isEditingAccount ? (
            <Arrow 
            width={40}
            height={40}
            onClick={() => setIsEditingAccount(!isEditingAccount)}/>
        ) : (
            <EditIcon onClick={() => setIsEditingAccount(!isEditingAccount)}/>
        )
    }
    return (
        <div className="AccountSettings__Container">
                
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <div className="AccountSettings__UserName">Bank Details</div>
                    <div className="AccountSettings__BodyText">Your saved Bank Account details.</div>
                </div>
                
                <div>
                    {getAccountDetailsIcon()}
                </div>
            </div>

            { isLoading ? (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress color="inherit" />
                </div>
            ) : (
                !accountDetails || isEditingAccount ? (
                    <>
                        <ValidationTextInput 
                        label="Account Number"
                        onChange={e => setAccNumber(e.target.value)}
                        placeholder="1234 5678"
                        />

                        <ValidationTextInput 
                        label="BSB" 
                        onChange={e => setBsb(e.target.value)}
                        placeholder="456-789"
                        />
                        <Button 
                        isLoading={isUpdateAccountLoading}
                        text="Update" 
                        inLineError
                        errorMessage={updateAccountError}
                        onClick={updateAccountDetails}
                        />
                    </>
                ) : (
                    
                <div className="AccountCardContainer">
                        <div className="AccountCardField">
                            <span>Account Number</span>
                            <span>XX XXX {accountDetails.last4}</span>
                        </div>
                        <div className="AccountCardField">
                            <span>BSB</span>
                            <span>{accountDetails.routing_number}</span>
                        </div>
                        
                    </div>
                )
            )}
        </div>
    )
}
