import { createSlice } from '@reduxjs/toolkit'
import { IReduxLogout } from 'src/interfaces/auth.interface'

const initialState = true
const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    updateLogout: (state: boolean, action: IReduxLogout) => {
      state = action.payload
      return state
    },
    logout: (state: boolean) => {
      return state
    }
  }
})

export const { updateLogout, logout } = logoutSlice.actions
export default logoutSlice.reducer
