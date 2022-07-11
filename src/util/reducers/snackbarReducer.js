const snackbarReducer = (state, action) => {
    switch (action.type) {
        case 'openSnackBar': {
            return {
                ...state,
                toggleSnackbar: true,
                snackbarMessage: action.data.message,
                snackbarBtnText: action.data.btnText,
                snackbarBtnFunc: action.data.btnFunc,
            }
        }
        case 'closeSnackBar': {
            return {
                ...state,
                toggleSnackbar: false,
            }
        }
        default:
            return state
    }
}

export default snackbarReducer