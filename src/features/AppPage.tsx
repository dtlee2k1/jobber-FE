/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IReduxState } from 'src/interfaces/store.interface'
import Layout from 'src/layouts/Layout'
import { useCheckCurrentUserQuery } from 'src/services/auth.service'
import { useGetCurrentBuyerByUsernameQuery } from 'src/services/buyer.service'
import { useGetSellerByUsernameQuery } from 'src/services/seller.service'
import HomeHeader from 'src/shared/header/HomeHeader'
import { applicationLogout, saveToSessionStorage } from 'src/shared/utils/utils.service'
import { useAppDispatch, useAppSelector } from 'src/store/store'

import { addAuthUser } from './auth/reducers/auth.reducer'
import { addBuyer } from './buyer/reducers/buyer.reducer'
import Home from './home/Home'
import Index from './index/Index'
import { addSeller } from './seller/reducers/seller.reducer'

export default function AppPage() {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)
  const appLogout = useAppSelector((state: IReduxState) => state.logout)
  const showCategoryContainer = true
  const [isValidToken, setIsValidToken] = useState<boolean>(false)

  const { data: currentUserData, isError } = useCheckCurrentUserQuery(undefined, { skip: authUser.id === null })
  const { data: buyerData } = useGetCurrentBuyerByUsernameQuery(undefined, { skip: authUser.id === null })
  const { data: sellerData } = useGetSellerByUsernameQuery(`${authUser.username}`, {
    skip: authUser.id === null
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const checkUser = useCallback(async () => {
    try {
      if (currentUserData && currentUserData.user && !appLogout) {
        setIsValidToken(true)
        dispatch(addAuthUser({ authInfo: currentUserData.user }))
        dispatch(addBuyer(buyerData?.buyer))
        dispatch(addSeller(sellerData?.seller))

        saveToSessionStorage(JSON.stringify(true), JSON.stringify(currentUserData.user.username))
      }
    } catch (error) {
      console.log(error)
    }
  }, [appLogout, currentUserData, dispatch, buyerData, sellerData])

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
