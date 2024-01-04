import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Family } from '../constants/interfaces'

const initialState: Family = {
  name: '',
  id: '',
  users: [],
  admin: '',
  password: '',
  folder: [],
}

const familySlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    updateFamily: (state, action: PayloadAction<Family>) => {
      return action.payload
    },
  },
})

export const { updateFamily } = familySlice.actions
export default familySlice.reducer
