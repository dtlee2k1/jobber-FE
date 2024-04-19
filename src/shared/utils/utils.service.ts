import { Dispatch } from '@reduxjs/toolkit'
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
import { filter } from 'lodash'
import { NavigateFunction } from 'react-router-dom'
import { logout } from 'src/features/auth/reducer/logout.reducer'
import { IOrderDocument } from 'src/interfaces/order.interface'
import { authApi } from 'src/services/auth.service'
import { api } from 'src/store/api'

countries.registerLocale(enLocale)

export const lowerCase = (str: string) => {
  return str.toLowerCase()
}

export const firstLetterUppercase = (str: string) => {
  const valueString = lowerCase(`${str}`)
  return `${valueString.charAt(0).toUpperCase()}${valueString.slice(1).toLowerCase()}`
}

export const replaceSpacesWithDash = (title: string) => {
  const lowercaseTitle: string = lowerCase(`${title}`)
  return lowercaseTitle.replace(/\/| /g, '-') // replace / and space with -
}

export const replaceDashWithSpaces = (title: string) => {
  const lowercaseTitle: string = lowerCase(`${title}`)
  return lowercaseTitle.replace(/-|\/| /g, ' ') // replace - / and space with -
}

export const replaceAmpersandWithSpace = (title: string) => {
  return title.replace(/&/g, '')
}

export const replaceAmpersandAndDashWithSpace = (title: string) => {
  const titleWithoutDash = replaceDashWithSpaces(title)
  return titleWithoutDash.replace(/&| /g, ' ')
}

export const categories = (): string[] => {
  return [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Photography',
    'Data',
    'Business'
  ]
}

export const countriesList = (): string[] => {
  const countriesObj = countries.getNames('en', { select: 'official' })
  return Object.values(countriesObj)
}

export const saveToSessionStorage = (data: string, username: string): void => {
  sessionStorage.setItem('isLoggedIn', data)
  sessionStorage.setItem('loggedInUser', username)
}

export const getDataFromSessionStorage = (key: string) => {
  const data = sessionStorage.getItem(key) as string
  return JSON.parse(data)
}

export const saveToLocalStorage = (key: string, data: string): void => {
  localStorage.setItem(key, data)
}

export const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key) as string
  return JSON.parse(data)
}

export const deleteFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key)
}

export const applicationLogout = (dispatch: Dispatch, navigate: NavigateFunction) => {
  const loggedInUsername: string = getDataFromSessionStorage('loggedInUser')
  dispatch(logout())

  if (loggedInUsername) {
    dispatch(authApi.endpoints.removeLoggedInUser.initiate(loggedInUsername) as any, { track: false })
  }
  dispatch(api.util.resetApiState())
  dispatch(authApi.endpoints.logout.initiate() as any)
  saveToSessionStorage(JSON.stringify(false), JSON.stringify(''))
  deleteFromLocalStorage('becomeASeller')
  navigate('/')
}

export const orderTypes = (status: string, orders: IOrderDocument[]) => {
  const orderList = orders.filter((order) => lowerCase(order.status) === status)
  return orderList.length
}

export const sellerOrderList = (status: string, orders: IOrderDocument[]): IOrderDocument[] => {
  const orderList: IOrderDocument[] = filter(orders, (order: IOrderDocument) => lowerCase(order.status) === lowerCase(status))
  return orderList
}

export const degreeList = () => {
  return ['Associate', 'B.A.', 'B.Sc.', 'M.A.', 'M.B.A.', 'M.Sc.', 'J.D.', 'M.D.', 'Ph.D.', 'LLB', 'Certificate', 'Other']
}

export const languageLevel = () => {
  return ['Basic', 'Conversational', 'Fluent', 'Native']
}

export const yearsList = (maxOffset: number) => {
  const years: string[] = []
  const currentYear: number = new Date().getFullYear()

  for (let i = 0; i <= maxOffset; i++) {
    const year = currentYear - i
    years.push(`${year}`)
  }
  return years
}
