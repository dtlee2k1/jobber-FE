import { createSlice } from '@reduxjs/toolkit'
import { IReduxHeader } from 'src/interfaces/header.interface'

const initialState = 'index'

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    updateHeader: (state: string, action: IReduxHeader) => {
      state = action.payload
      return state
    }
  }
})

export const { updateHeader } = headerSlice.actions
export default headerSlice.reducer
