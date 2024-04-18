import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from 'src/features/auth/reducer/auth.reducer'
import logoutReducer from 'src/features/auth/reducer/logout.reducer'
import buyerReducer from 'src/features/buyer/reducers/buyer.reducer'

import { api } from './api'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['clientApi', '_persist']
}

export const combineReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  authUser: authReducer,
  logout: logoutReducer,
  buyer: buyerReducer
})

export const rootReducers = (state: any, action: any) => {
  // Reset the state to default when user logout
  if (action.type === 'logout/logout') {
    state = {} as RootState
  }
  return combineReducer(state, action as never)
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware)
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
