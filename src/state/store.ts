import { configureStore } from '@reduxjs/toolkit'
import VideoReducer from './VideoReducer'

export const store = configureStore({
  reducer: {
    video: VideoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch