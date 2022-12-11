import { lightGreen, red, grey } from '@mui/material/colors';

const ADD_SNACKBAR = 'snackbars/ADD_SNACKBAR'
const REMOVE_SNACKBAR = 'snackbars/REMOVE_SNACKBAR'

const customColors = {
    lightGrey: grey[400],
    mainGrey: grey[600],
    darkGrey: grey[900],
    lightGreen: lightGreen[200],
    mainGreen: lightGreen[800],
    darkGreen: lightGreen[900],
    lightRed: red[200],
    mainRed: red[800],
    darkRed: red[900],
}

export const addSnackbar = (message, color = 'maingreen', displayTime = 3000) => (dispatch) => {
    const key = Date.now();
    const currentColor = customColors[color] || color;
    dispatch(addSnackbarActionCreator(message, currentColor, key));
    setTimeout(() => dispatch(removeSnackbarActionCreator(key)), displayTime);
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

export default snackbarState