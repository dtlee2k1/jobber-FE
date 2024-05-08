import { Transition } from '@headlessui/react'
import { useEffect, useRef, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, NavLink } from 'react-router-dom'
import useDetectOutsideClick from 'src/hooks/useDetectOutsideClick'
import { IReduxState } from 'src/interfaces/store.interface'
import { socket, socketService } from 'src/sockets/socket.service'
import { useAppSelector } from 'src/store/store'

import Button from '../../button/Button'
import { lowerCase } from '../../utils/utils.service'
import SettingsDropdown from './SettingsDropdown'

export default function DashBoardHeader() {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)
  const buyer = useAppSelector((state: IReduxState) => state.buyer)
  const seller = useAppSelector((state: IReduxState) => state.seller)

  const [authUsername, setAuthUsername] = useState<string>('')
  const dropdownOpenRef = useRef<HTMLDivElement | null>(null)

  const { isActive: isDropdownOpen, setIsActive: setIsDropdownOpen } = useDetectOutsideClick(dropdownOpenRef, false)

  useEffect(() => {
    socketService.setupSocketConnection()
    socket.emit('getLoggedInUsers')
    socket.on('online', (data: string[]) => {
      const username = data.find((username: string) => username === authUser.username)
      setAuthUsername(`${username}`)
    })
  }, [authUser.username])
  return (
    <header>
      <nav className="navbar peer-checked:navbar-active relative z-20 w-full border-b bg-white shadow-2xl shadow-gray-600/5 backdrop-blur dark:shadow-none">
        <div className="m-auto px-6 xl:container md:px-12 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-3 lg:py-5">
            <div className="flex w-full gap-x-4 lg:w-6/12">
              <div className="flex w-full">
                <label htmlFor="hbr" className="peer-checked:hamburger relative z-20 -ml-4 block cursor-pointer p-6 lg:hidden">
                  <Button
                    className="m-auto flex h-0.5 w-5 items-center rounded transition duration-300"
                    label={<FaBars className="h-5 w-5 text-sky-500" />}
                  />
                </label>
                <div className="w-full gap-x-4 md:flex">
                  <Link
                    to={`/${lowerCase(`${seller.username}`)}/${seller._id}/seller_dashboard`}
                    className="relative z-10 flex h-full cursor-pointer items-center justify-center self-center text-2xl font-semibold text-black lg:text-3xl"
                  >
                    Jobber
                  </Link>
                </div>
              </div>
            </div>
            <div className="navmenu mb-16 hidden w-full cursor-pointer flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-300/20 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none md:flex-nowrap lg:m-0 lg:flex lg:w-6/12 lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="text-[#74767e] lg:pr-4">
                <ul className="flex text-base font-medium">
                  <li className="relative flex items-center">
                    <NavLink
                      to={`/${lowerCase(`${seller.username}`)}/${seller._id}/manage_orders`}
                      className={({ isActive }) => {
                        const active = isActive ? 'text-slate-900' : ''
                        return `${active} px-3 hover:text-slate-900`
                      }}
                    >
                      <span>Orders</span>
                    </NavLink>
                  </li>
                  <li className="relative flex items-center">
                    <NavLink
                      to={`/${lowerCase(`${seller.username}`)}/${seller._id}/manage_earnings`}
                      className={({ isActive }) => {
                        const active = isActive ? 'text-slate-900' : ''
                        return `${active} px-3 hover:text-slate-900`
                      }}
                    >
                      <span>Earnings</span>
                    </NavLink>
                  </li>
                  <li className="relative flex cursor-pointer items-center">
                    <Button
                      className="px-3 text-base font-medium"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      label={
                        <>
                          <LazyLoadImage
                            src={seller.profilePicture}
                            alt="profile image"
                            className="h-7 w-7 rounded-full object-cover"
                            placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
                            effect="blur"
                          />
                        </>
                      }
                    />
                    {authUsername === authUser.username && (
                      <span className="absolute bottom-1 left-8 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-400"></span>
                    )}
                    <Transition
                      ref={dropdownOpenRef}
                      show={isDropdownOpen}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <div className="absolute right-0 z-50 mt-5">
                        <SettingsDropdown
                          authUser={authUser}
                          buyer={buyer}
                          seller={seller}
                          setIsDropdownOpen={setIsDropdownOpen}
                          type="seller"
                        />
                      </div>
                    </Transition>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
