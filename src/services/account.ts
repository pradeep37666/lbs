import axios from 'axios'
import Instance from '../util/axios'

const networkErrorMessage =
    'There was an error with your connection, please try again'

class AccountService {
    createSupport = async ({ subject, message }: {
        subject: string,
        message: string
    }) => {
        try {
            const result = await Instance.post('/supports', {
                message,
                subject
            })
            if (result.status !== 201) throw Error
            return result.data
        } catch (error) {
            if (error && axios.isAxiosError(error)) {
                if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
                    throw Error(networkErrorMessage)
            }

            throw Error('Error fetching user details')
        }
    }
}

export default AccountService