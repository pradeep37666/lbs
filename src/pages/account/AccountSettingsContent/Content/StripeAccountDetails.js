import { useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import Instance from '../../../../util/axios'
import ValidationTextInput from '../../../../components/FormComponents/ValidationTextInput'
import Button from '../../../../components/Button/Button'
import useGlobalState from '../../../../util/useGlobalState'
import EditIcon from '../../../../assets/Icons/EditIcon'
import './StripeAccountDetails.css'

export default function AccountDetails() {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const [isEditingAccount, setIsEditingAccount] = useState(false)
    const [isUpdateAccountLoading, setIsUpdateAccountLoading] = useState(false)
    const [updateAccountError, setUpdateAccountError] = useState()
    const [accountDetails, setAccountDetails] = useState()
    const [accNumber, setAccNumber] = useState(user.account_number)
    const [bsb, setBsb] = useState(user.bsb)

    const stripe = useStripe()

    useEffect(() => {
        getAccountDetails()

    }, [])

    const getAccountDetails = async () => {
        try{
            const { data, status } = await Instance.get('/stripe/retrieveAccount')
            const { last4, routing_number } = data
            setAccountDetails({ last4, routing_number })
        } catch(err) {
            console.log(err.response)
        }
    }

    const createUpdateAccountToken = async () => {
        setIsUpdateAccountLoading(true)
        try{
            const response = await stripe.createToken('bank_account', {
                country: 'AU',
                currency: 'aud',
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
        } finally{
            setIsUpdateAccountLoading(false)
        }
    }

    const updateAccountDetails = async () => {
        const token = await createUpdateAccountToken()
        try{
            const { data, status } = await Instance.patch('/stripe/updateAccount', { token: token.id })
            console.log(data, status)
        } catch(err){
            console.log(err.response)
        }
    }


    return (
        <div className="AccountSettings__Container">
            
                <div>
                    <div className="AccountSettings__UserName">Bank Details</div>
                    <div className="AccountSettings__BodyText">Your saved Bank Account details.</div>
                    { accountDetails && !isEditingAccount ? (
                        <div className="AccountCardContainer">
                            <div className="AccountCardField">
                                <span>Account Number</span>
                                <span>{accountDetails.last4}</span>
                            </div>
                            <div className="AccountCardField">
                                <span>BSB</span>
                                <span>{accountDetails.routing_number}</span>
                            </div>
                            <EditIcon onClick={() => setIsEditingAccount(!isEditingAccount)}/>
                        </div>
                    ) : (
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
                            onClick={updateAccountDetails}/>
                        </>
                    )}
                </div>
        </div>
    )
}
