const ADD_SNACKBAR = 'snackbars/ADD_SNACKBAR'
const REMOVE_SNACKBAR = 'snackbars/REMOVE_SNACKBAR'

const customColors = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
}

export const addSnackbar = (message, color = 'green', displayTime = 3000) => (dispatch, getState) => {
    const key = Date.now();
    const currentColor = customColors[color] || color;
    dispatch(addSnackbarActionCreator(message, currentColor, key));
    setTimeout(() => removeSnackbarActionCreator(key), displayTime);
}

const addSnackbarActionCreator = (message, color, key) => ({
    type: ADD_SNACKBAR,
    message,
    color,
    key,
})

const removeSnackbarActionCreator = (key) => ({
    type: REMOVE_SNACKBAR,
    key,
})

const initialState = {
    bars: []
}

const snackbarState = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SNACKBAR:
            return {
                ...state,
                bars: [{
                    message: action.message,
                    color: action.color,
                    key: action.key
                },
                ...state.bars,
                ]
            }
        case REMOVE_SNACKBAR:
            return {
                ...state,
                bars: state.bars.filter(el => el.key !== action.key)
            }
        default:
            return state
    }
}

export default snackbarState;