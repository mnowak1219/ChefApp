import { configureStore } from '@reduxjs/toolkit'
import fullScreenCircularProgress from './state/fullScreenCircularProgress'
import snackbars from './state/snackbars'

export const store = configureStore({
  reducer: {
    fullScreenCircularProgress,
    snackbars,
  }
})