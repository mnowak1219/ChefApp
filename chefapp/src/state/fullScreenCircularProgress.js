const ADD_CIRCULAR = 'fullScreenCircularProgress/ADD_CIRCULAR'
const REMOVE_CIRCULAR = 'fullScreenCircularProgress/REMOVE_CIRCULAR'

const addCircularActionCreator = () => ({ type: ADD_CIRCULAR })
const removeCircularActionCreator = () => ({ type: REMOVE_CIRCULAR })

export const circularProgress ={
    add: addCircularActionCreator,
    remove: removeCircularActionCreator
}
const initialState = {
    circulars: []
}

const circularState = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CIRCULAR:
            return {
                ...state,
                circulars: [...state.circulars, true]
            }
        case REMOVE_CIRCULAR:
            return {
                ...state,
                circulars: state.circulars.filter((el, index) => index !== 0)
            }
        default:
            return state
    }
}

export default circularState;
