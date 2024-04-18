/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IReduxState } from 'src/interfaces/store.interface'
import Layout from 'src/layouts/Layout'
import { useCheckCurrentUserQuery } from 'src/services/auth.service'
import HomeHeader from 'src/shared/header/HomeHeader'
import { applicationLogout, saveToSessionStorage } from 'src/shared/utils/utils.service'
import { useAppDispatch, useAppSelector } from 'src/store/store'

import { addAuthUser } from './auth/reducer/auth.reducer'
import Home from './home/Home'
import Index from './index/Index'

export default function AppPage() {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)
  const appLogout = useAppSelector((state: IReduxState) => state.logout)
  const showCategoryContainer = true
  const [isValidToken, setIsValidToken] = useState<boolean>(false)

  const { data: currentUserData, isError } = useCheckCurrentUserQuery()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const checkUser = useCallback(async () => {
    try {
      if (currentUserData && currentUserData.user && !appLogout) {
        setIsValidToken(true)
        dispatch(addAuthUser({ authInfo: currentUserData.user }))

        saveToSessionStorage(JSON.stringify(true), JSON.stringify(currentUserData.user.username))
      }
    } catch (error) {
      console.log(error)
    }
  }, [appLogout, currentUserData, dispatch])

  const logoutUser = useCallback(async () => {
    if ((!currentUserData && appLogout) || isError) {
      setIsValidToken(false)
      applicationLogout(dispatch, navigate)
    }
  }, [appLogout, currentUserData, dispatch, navigate, isError])

  useEffect(() => {
    checkUser()
    logoutUser()
  }, [checkUser, logoutUser])

  return authUser && !authUser.id && !isValidToken ? (
    <Index />
  ) : (
    <>
      <HomeHeader showCategoryContainer={showCategoryContainer} />
      <Layout backgroundColor="#fff">
        <Home />
      </Layout>
    </>
  )
}
