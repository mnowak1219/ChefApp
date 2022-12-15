import { configureStore } from '@reduxjs/toolkit'
import circularProgress from './state/circularProgress'
import snackbars from './state/snackbars'
import drawer from './state/drawer'
import recipes from './state/recipes'
import auth from './state/auth'

export const store = configureStore({
  reducer: {
    circularProgress,
    snackbars,
    drawer,
    recipes,
    auth,
  }
})