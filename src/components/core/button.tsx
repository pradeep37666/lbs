import { CircularProgress } from '@material-ui/core'
import React, { ReactNode } from 'react'

type Props = {
    text: string
    onClick: () => void
    className?: string
    icon?: ReactNode,
    isLoading?: boolean
    type?: 'submit' | 'button'
    disabled?: boolean
}

function Button({ text, onClick, className, icon, isLoading, type, disabled }: Props): JSX.Element {
    return (
        <button onClick={!isLoading && !disabled ? onClick : () => null} className={`btn-primary ` + className + `${disabled ? ' opacity-50 hover:scale-100' : ''}`} type={type ?? 'button'}>
            {isLoading ? <CircularProgress size={'24px'} thickness={4.5} style={{ color: '#FFF' }}/>
            : <>
            {text}
            {icon && <i>{icon}</i>}
            </>}
        </button>
    )
}

export default Button
