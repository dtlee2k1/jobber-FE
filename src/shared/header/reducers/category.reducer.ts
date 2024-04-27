import { createSlice } from '@reduxjs/toolkit'
import { IReduxShowCategory } from 'src/interfaces/header.interface'

const initialState = true

const categoryContainerSlice = createSlice({
  name: 'showCategoryContainer',
  initialState,
  reducers: {
    updateCategoryContainer: (state: boolean, action: IReduxShowCategory): boolean => {
      state = action.payload
      return state
    }
  }
})

export const { updateCategoryContainer } = categoryContainerSlice.actions
export default categoryContainerSlice.reducer
