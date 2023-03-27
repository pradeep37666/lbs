import { SNACKBAR_BUTTON_TYPES } from '../assets/Data/LBSEnum'
import useErrorState from './reducers/errorContext'

const useErrorDispatch = () => {
  const { errorDispatch } = useErrorState()
  errorDispatch({
    type: 'openSnackBar',
    data: {
      message: 'Something went wrong...',
      btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
      btnFunc: () => {
        errorDispatch({ type: 'closeSnackBar' })
      },
    },
  })
}

export default useErrorDispatch
