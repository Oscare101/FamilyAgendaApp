import { configureStore } from '@reduxjs/toolkit'

import userReducer from './user'
import familyReducer from './family'

export const store = configureStore({
  reducer: {
    user: userReducer,
    family: familyReducer,
  },
})
