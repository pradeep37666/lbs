import axios from 'axios'
import Instance from '../util/axios'

const networkErrorMessage =
    'There was an error with your connection, please try again'

class BlogService {
    getBlogs = async (nextPage: number=0, limit: number=10,) => {
        let searchQuery = `offset=${nextPage}&limit=${limit}`
        try {
          const { data, status } = await Instance.get(`/blogs?${searchQuery}`)
          if (status !== 200) throw Error
          return data
        } catch (error) {
          if (error && axios.isAxiosError(error)) {
            if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
              throw Error(networkErrorMessage)
          }
          throw Error('Error fetching user details')
        }
      }
    }


export default BlogService