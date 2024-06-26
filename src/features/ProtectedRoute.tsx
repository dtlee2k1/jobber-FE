import { ReactNode, useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { IReduxState } from 'src/interfaces/store.interface'
import { useCheckCurrentUserQuery } from 'src/services/auth.service'
import HomeHeader from 'src/shared/header/components/HomeHeader'
import { applicationLogout, saveToSessionStorage } from 'src/shared/utils/utils.service'
import { useAppDispatch, useAppSelector } from 'src/store/store'

import { addAuthUser } from './auth/reducers/auth.reducer'

interface IProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: IProtectedRouteProps) {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)
  const header = useAppSelector((state: IReduxState) => state.header)
  const showCategoryContainer = useAppSelector((state: IReduxState) => state.showCategoryContainer)

  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { data, isError } = useCheckCurrentUserQuery()

  const checkUser = useCallback(async () => {
    if (data && data.user) {
      setTokenIsValid(true)
      dispatch(addAuthUser({ authInfo: data.user }))
      saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username))
    }

    if (isError) {
      setTokenIsValid(false)
      applicationLogout(dispatch, navigate)
    }
  }, [data, dispatch, navigate, isError, authUser.username])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  if ((data && data.user) || authUser) {
    return tokenIsValid ? (
      <>
        {header === 'home' && <HomeHeader showCategoryContainer={showCategoryContainer} />}
        {children}
      </>
    ) : null
  } else {
    return <Navigate replace to="/" />
  }
}
