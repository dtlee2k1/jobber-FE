import { createSlice, Slice } from '@reduxjs/toolkit'
import { IBuyerDocument, IReduxBuyer } from 'src/interfaces/buyer.interface'

export const initialState: IBuyerDocument = {
  _id: '',
  username: '',
  email: '',
  profilePicture: '',
  country: '',
  isSeller: false,
  purchasedGigs: [],
  createdAt: ''
}

const buyerSlice: Slice = createSlice({
  name: 'buyer',
  initialState,
  reducers: {
    addBuyer: (state: IBuyerDocument, action: IReduxBuyer) => {
      state = { ...action.payload }
      return state
    },
    emptyBuyer: (): IBuyerDocument => {
      return initialState
    }
  }
})

export const { addBuyer, emptyBuyer } = buyerSlice.actions
export default buyerSlice.reducer
