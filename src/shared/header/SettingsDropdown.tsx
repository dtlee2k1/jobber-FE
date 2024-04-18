import { Dispatch, SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IAuthUser } from 'src/interfaces/auth.interface'
import { IBuyerDocument } from 'src/interfaces/buyer.interface'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { useAppDispatch } from 'src/store/store'

import { applicationLogout, lowerCase } from '../utils/utils.service'

export interface IHomeHeaderProps {
  buyer?: IBuyerDocument
  seller?: ISellerDocument
  authUser?: IAuthUser
  type?: string
  showCategoryContainer?: boolean
  setIsDropdownOpen?: Dispatch<SetStateAction<boolean>>
  setIsOrderDropdownOpen?: Dispatch<SetStateAction<boolean>>
  setIsMessageDropdownOpen?: Dispatch<SetStateAction<boolean>>
  setIsNotificationDropdownOpen?: Dispatch<SetStateAction<boolean>>
}

export default function SettingsDropdown({ buyer, seller, authUser, type, setIsDropdownOpen }: IHomeHeaderProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onLogout = () => {
    setIsDropdownOpen && setIsDropdownOpen(false)

    applicationLogout(dispatch, navigate)
  }

  return (
    <div className="border-grey w-44 divide-y divide-gray-100 rounded border bg-white shadow-md">
      <ul className="text-gray-700s py-2 text-sm" aria-labelledby="avatarButton">
        {buyer && buyer.isSeller && (
          <li className="mx-3 mb-1">
            <Link
              to={`${type === 'buyer' ? `/${lowerCase(`${authUser?.username}`)}/${seller?._id}/seller_dashboard` : '/'}`}
              className="px-4s block w-full cursor-pointer rounded bg-sky-500 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none"
            >
              {type === 'buyer' ? 'Switch to Selling' : 'Switch to Buying'}
            </Link>
          </li>
        )}

        {buyer && buyer.isSeller && type === 'buyer' && (
          <li>
            <Link
              to={`/manage_gigs/new/${seller?._id}`}
              className="block px-4 py-2 hover:text-sky-400"
              onClick={() => {
                setIsDropdownOpen && setIsDropdownOpen(false)
              }}
            >
              Add a new gig
            </Link>
          </li>
        )}

        {type === 'buyer' && (
          <li>
            <Link
              to={`/users/${buyer?.username}/${buyer?._id}/orders`}
              className="block px-4 py-2 hover:text-sky-400"
              onClick={() => {
                setIsDropdownOpen && setIsDropdownOpen(false)
              }}
            >
              Dashboard
            </Link>
          </li>
        )}

        {buyer && buyer.isSeller && type === 'buyer' && (
          <li>
            <Link
              to={`/seller_profile/${lowerCase(`${seller?.username}`)}/${seller?._id}/edit`}
              className="block px-4 py-2 hover:text-sky-400"
              onClick={() => {
                setIsDropdownOpen && setIsDropdownOpen(false)
              }}
            >
              Profile
            </Link>
          </li>
        )}

        <li>
          <Link
            to={`${lowerCase(`${buyer?.username}/edit`)}`}
            className="block px-4 py-2 hover:text-sky-400"
            onClick={() => {
              if (setIsDropdownOpen) {
                setIsDropdownOpen(false)
              }
            }}
          >
            Settings
          </Link>
        </li>
      </ul>
      <div className="py-1">
        <div onClick={onLogout} className="block px-4 py-2 text-sm hover:text-sky-400">
          Sign out
        </div>
      </div>
    </div>
  )
}
