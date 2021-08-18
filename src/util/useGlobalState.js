import React, { useContext } from 'react'
import { GlobalStateContext } from '../App'

export default function useGlobalState() {
    return useContext(GlobalStateContext)
}
