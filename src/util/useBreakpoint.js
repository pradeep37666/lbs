import { useEffect, useState } from 'react'

export const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState('DESKTOP')

    function handleResize(){
        setBreakpoint(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        setBreakpoint(window.innerWidth)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    function getBreakpoint(){
        if(breakpoint > 600) return 'DESKTOP'
        // if(breakpoint > 600) return 'TABLET'
        return 'MOBILE'
    }
    return getBreakpoint()
}