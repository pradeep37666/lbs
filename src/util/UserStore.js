export const LoginUser = (data) => {
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token.accessToken)
}

export const GetUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

export const GetToken = () => {
    return localStorage.getItem('token')
}

export const LogoutUser = () => {
    localStorage.clear()
}