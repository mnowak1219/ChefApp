import { configureStore } from '@reduxjs/toolkit'
import circularProgress from './state/circularProgress'
import snackbars from './state/snackbars'
import drawer from './state/drawer'

export const store = configureStore({
  reducer: {
    circularProgress,
    snackbars,
    drawer
  }
})