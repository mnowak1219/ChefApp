import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme.js'
import { Provider } from 'react-redux'
import { store } from './store'
import { App } from './App'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);