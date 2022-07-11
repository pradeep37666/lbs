import { useContext } from 'react'
import { GlobalErrorContext } from '../../App'

export default function useErrorState(){
    return useContext(GlobalErrorContext)
}