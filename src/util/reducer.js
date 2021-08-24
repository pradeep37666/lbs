export default function reducer(state, action) {
    console.log('in reducer: ', action)
    switch (action.type) {
        case 'setUser': {
            return {
                ...state,
                user: action.data
            }
        }
        default:
            return state
    }
}