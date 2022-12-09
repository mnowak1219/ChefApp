import { configureStore } from '@reduxjs/toolkit'
import fullScreenCircularProgress from './state/fullScreenCircularProgress'

export const store = configureStore({
  reducer: {
    fullScreenCircularProgress
  }
})