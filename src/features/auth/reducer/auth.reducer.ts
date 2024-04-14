import { createSlice } from '@reduxjs/toolkit'
import { IAuthUser, IReduxAddAuthUser } from 'src/interfaces/auth.interface'

const initialState: IAuthUser = {
  id: null,
  username: null,
  email: null,
  profilePublicId: null,
  profilePicture: null,
  country: null,
  emailVerificationToken: null,
  emailVerified: null,
  passwordResetExpires: null,
  passwordResetToken: null,
  createdAt: null,
  updatedAt: null,
  browserName: null,
  deviceType: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuthUser: (state: IAuthUser, action: IReduxAddAuthUser) => {
      const { authInfo } = action.payload
      state = { ...authInfo } as unknown as IAuthUser
      return state
    },
    clearAuthUser: () => {
      return initialState
    }
  }
})

export const { addAuthUser, clearAuthUser } = authSlice.actions
export default authSlice.reducer
