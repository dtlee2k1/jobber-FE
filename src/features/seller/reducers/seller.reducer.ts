import { createSlice, Slice } from '@reduxjs/toolkit'
import { IReduxSeller, ISellerDocument } from 'src/interfaces/seller.interface'

const initialState: ISellerDocument = {
  _id: '',
  profilePublicId: '',
  fullName: '',
  profilePicture: '',
  username: '',
  email: '',
  description: '',
  country: '',
  oneliner: '',
  skills: [],
  ratingsCount: 0,
  ratingSum: 0,
  ratingCategories: {
    five: { value: 0, count: 0 },
    four: { value: 0, count: 0 },
    three: { value: 0, count: 0 },
    two: { value: 0, count: 0 },
    one: { value: 0, count: 0 }
  },
  recentDelivery: '',
  languages: [],
  responseTime: 0,
  experience: [],
  education: [],
  socialLinks: [],
  certificates: [],
  ongoingJobs: 0,
  completedJobs: 0,
  cancelledJobs: 0,
  totalEarnings: 0,
  totalGigs: 0,
  paypal: '',
  createdAt: ''
}

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
