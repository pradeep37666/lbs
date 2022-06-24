export default function reducer(state, action) {
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