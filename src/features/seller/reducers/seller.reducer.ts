import { createSlice, Slice } from '@reduxjs/toolkit'
import { IReduxSeller, ISellerDocument } from 'src/interfaces/seller.interface'
import { emptySellerData } from 'src/shared/utils/static-data'

const initialState: ISellerDocument = emptySellerData

const sellerSlice: Slice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    addSeller: (state: ISellerDocument, action: IReduxSeller) => {
      if (!action.payload) {
        return state
      }

      state = { ...action.payload }
      return state
    },
    emptySeller: (): ISellerDocument => {
      return initialState
    }
  }
})

export const { addSeller, emptySeller } = sellerSlice.actions
export default sellerSlice.reducer
