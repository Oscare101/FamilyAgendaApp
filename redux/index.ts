import { configureStore } from '@reduxjs/toolkit'

import userReducer from './user'
import familyReducer from './family'

export const store = configureStore({
  reducer: {
    user: userReducer,
    family: familyReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
