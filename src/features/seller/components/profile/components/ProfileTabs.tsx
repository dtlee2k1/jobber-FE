import { Dispatch, SetStateAction } from 'react'
import Dropdown from 'src/shared/dropdown/Dropdown'

interface IProfileTabsProps {
  type: string
  setType: Dispatch<SetStateAction<string>>
}

export default function ProfileTabs({ type, setType }: IProfileTabsProps) {
  return (
    <>
      <div className="border-grey bg-white sm:hidden">
        <Dropdown text={type} maxHeight="300" values={['Overview', 'Active Gigs', 'Ratings & Reviews']} setValue={setType} />
      </div>
      <ul className="hidden divide-x divide-gray-200 text-center text-sm font-medium text-gray-500 shadow dark:text-gray-400 sm:flex">
        <li className="w-full">
          <div
            onClick={() => setType('Overview')}
            className={`inline-block w-full p-4 text-gray-600 hover:text-gray-700 focus:outline-none
            ${type === 'Overview' ? 'bg-sky-200' : 'bg-white'}
          `}
          >
            Overview
          </div>
        </li>
        <li className="w-full">
          <div
            onClick={() => setType('Active Gigs')}
            className={`inline-block w-full p-4 text-gray-600 hover:text-gray-700 focus:outline-none
            ${type === 'Active Gigs' ? 'bg-sky-200' : 'bg-white'}
          `}
          >
            Active Gigs
          </div>
        </li>
        <li className="w-full">
          <div
            onClick={() => setType('Ratings & Reviews')}
            className={`inline-block w-full p-4 text-gray-600 hover:text-gray-700 focus:outline-none
            ${type === 'Ratings & Reviews' ? 'bg-sky-200' : 'bg-white'}
          `}
          >
            Ratings & Reviews
          </div>
        </li>
      </ul>
    </>
  )
}
