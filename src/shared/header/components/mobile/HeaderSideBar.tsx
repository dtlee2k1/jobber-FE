import { Transition } from '@headlessui/react'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { FaAngleDown, FaAngleRight, FaAngleUp } from 'react-icons/fa'
import { IHeaderModalProps } from 'src/interfaces/header.interface'
import { categories, saveToLocalStorage } from 'src/shared/utils/utils.service'
import { v4 as uuidv4 } from 'uuid'

interface IHeaderSideBarProps {
  setShowRegisterModal?: Dispatch<SetStateAction<IHeaderModalProps>>
  setShowLoginModal?: Dispatch<SetStateAction<IHeaderModalProps>>
  setOpenSidebar?: Dispatch<SetStateAction<boolean>>
}

export default function HeaderSideBar({ setOpenSidebar, setShowLoginModal, setShowRegisterModal }: IHeaderSideBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const show = true

  const toggleDropdown = (event: MouseEvent): void => {
    event.stopPropagation()
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div
      className={'fixed left-0 top-0 z-40 flex h-screen w-full bg-black/40 transition-all duration-500'}
      onClick={() => {
        if (setShowRegisterModal && setShowLoginModal && setOpenSidebar) {
          setShowRegisterModal((item: IHeaderModalProps) => ({ ...item, register: false }))
          setShowRegisterModal((item: IHeaderModalProps) => ({ ...item, login: false }))
          setOpenSidebar(false)
        }
      }}
    >
      <div
        className={`absolute top-0 z-20 flex h-screen w-[250px] flex-col items-start justify-start gap-4 bg-white p-6 ${
          show ? 'left-0' : '-left-[100vw]'
        }`}
      >
        <div className="z-2 sticky top-0 flex w-full flex-col items-start justify-start gap-6 bg-white">
          <div
            onClick={(event: MouseEvent) => {
              event.stopPropagation()
              if (setShowRegisterModal && setShowLoginModal && setOpenSidebar) {
                setShowRegisterModal((item: IHeaderModalProps) => ({ ...item, register: true }))
                setShowRegisterModal((item: IHeaderModalProps) => ({ ...item, login: false }))
                setOpenSidebar(false)
              }
            }}
            className="cursor-pointer rounded border border-sky-500 bg-sky-500 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:opacity-90"
          >
            Join Jobber
          </div>
          <div
            onClick={(event: MouseEvent) => {
              event.stopPropagation()
              if (setShowRegisterModal && setShowLoginModal && setOpenSidebar) {
                setOpenSidebar(false)
                setShowRegisterModal((item: IHeaderModalProps) => ({ ...item, register: true }))
                setShowRegisterModal((item: IHeaderModalProps) => ({ ...item, login: false }))
                saveToLocalStorage('becomeASeller', JSON.stringify(true))
              }
            }}
            className="cursor-pointer text-base font-medium text-gray-400 hover:text-sky-400"
          >
            Become a Seller
          </div>
          <div
            onClick={(event: MouseEvent) => {
              event.stopPropagation()
              if (setShowRegisterModal && setShowLoginModal && setOpenSidebar) {
                setShowRegisterModal((item: IHeaderModalProps) => ({ ...item, register: false }))
                setShowRegisterModal((item: IHeaderModalProps) => ({ ...item, login: true }))
                setOpenSidebar(false)
              }
            }}
            className="cursor-pointer text-base font-medium text-gray-400 hover:text-sky-400"
          >
            Sign In
          </div>
          <div className="flex w-full cursor-pointer flex-col text-base font-medium text-gray-400">
            <span className="flex justify-between hover:text-sky-400" onClick={toggleDropdown}>
              Browse Categories{' '}
              {!isDropdownOpen ? <FaAngleDown className="mt-1 flex self-center" /> : <FaAngleUp className="mt-1 flex self-center" />}
            </span>
            <div className="my-2">
              <Transition
                show={isDropdownOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <ul>
                  {categories().map((category: string) => (
                    <li key={uuidv4()} className="flex cursor-pointer justify-between py-2 text-right hover:text-sky-400">
                      <span className="w-full pr-6">{category}</span> <FaAngleRight className="flex self-center" />
                    </li>
                  ))}
                </ul>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
