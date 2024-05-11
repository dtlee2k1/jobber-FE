import { createSlice, Slice } from '@reduxjs/toolkit'
import { INotification, IReduxNotification } from 'src/interfaces/header.interface'

const initialState: INotification = {
  hasUnreadMessage: false,
  hasUnreadNotification: false
}

const notificationSlice: Slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification: (state: INotification, action: IReduxNotification): INotification => {
      state = { ...state, ...action.payload }
      return state
    }
  }
})

export const { updateNotification } = notificationSlice.actions
export default notificationSlice.reducer
