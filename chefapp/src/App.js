import React from 'react'
import FullScreenCircularProgress from './components/FullScreenCircularProgress'
import Snackbars from './components/Snackbars'

export const App = props => {
    return (
        <div className='container'>
            <FullScreenCircularProgress />
            <Snackbars />
        </div>
    )
}