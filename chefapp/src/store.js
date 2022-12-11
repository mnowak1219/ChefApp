import { configureStore } from '@reduxjs/toolkit'
import fullScreenCircularProgress from './state/fullScreenCircularProgress'
import snackbars from './state/snackbars'
import drawer from './state/drawer'

export const store = configureStore({
  reducer: {
    fullScreenCircularProgress,
    snackbars,
    drawer
  }
})