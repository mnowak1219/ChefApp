import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './store'
import { App } from './App'
import { theme } from './theme'
import { ThemeProvider } from '@mui/material/styles';
import { autoLogInAsyncActionCreator } from './state/auth'
import './main.css'

store.dispatch(autoLogInAsyncActionCreator())

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)