import { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import Button from 'src/shared/button/Button'
import TextInput from 'src/shared/inputs/TextInput'
import { v4 as uuidv4 } from 'uuid'

const deliveryTime = [
  { label: 'Up to 1 day', value: '1' },
  { label: 'Up to 2 days', value: '2' },
  { label: 'Up to 3 days', value: '3' },
  { label: 'Up to 4 days', value: '4' },
  { label: 'Up to 5 days', value: '5' },
  { label: 'Up to 7 days', value: '7' },
  { label: 'Up to 10 days', value: '10' },
  { label: 'Up to 14 days', value: '14' },
  { label: 'Up to 30 days', value: '30' },
  { label: 'Up to 60 days', value: '60' },
  { label: 'Up to 90 days', value: '90' },
  { label: 'Anytime', value: 'Anytime' }
]

export default function DeliveryTimeDropdown() {
  const [searchParams, setSearchParams] = useSearchParams({})
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)
  const [selectedTime, setSelectedTime] = useState<string>('Anytime')

  return (
    <div className="flex flex-col">
      <div className="relative">
        <Button
          className="flex justify-between gap-5 rounded-lg border border-gray-400 px-5 py-3 font-medium"
          label={
            <>
              <span className="truncate">Delivery time</span>
              {!toggleDropdown ? (
                <FaChevronDown className="float-right mt-1 h-4 fill-current text-slate-900" />
              ) : (
                <FaChevronUp className="float-right mt-1 h-4 fill-current text-slate-900" />
              )}
            </>
          }
          onClick={() => setToggleDropdown(!toggleDropdown)}
        />
        {toggleDropdown && (
          <div className="absolute z-50 mt-2 w-96 divide-y divide-gray-100 rounded-lg border border-slate-100 bg-white drop-shadow-md sm:w-72">
            <ul className="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200">
              {deliveryTime.map((time) => (
                <li key={uuidv4()} className="cursor-pointer" onClick={() => setSelectedTime(time.value)}>
                  <div className="flex rounded p-1.5">
                    <div className="flex h-5 items-center">
                      <TextInput
                        checked={time.value === selectedTime}
                        id="selectedTime"
                        name="selectedTime"
                        type="radio"
                        value={selectedTime}
                        className="dark:focus:ring-blue-sky-500 h-4 w-4 bg-gray-100 text-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700"
                        onChange={(e) => {
                          setSelectedTime(e.target.value)
                        }}
                      />
                    </div>
                    <div className="ml-2 text-sm ">
                      <label htmlFor="helper-radio-4" className="font-medium text-slate-950">
                        <div>{time.label}</div>
                      </label>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mb-4 flex cursor-pointer justify-evenly">
              <div
                className="px-4 py-2 text-sm font-medium text-slate-900"
                onClick={() => {
                  setSelectedTime('Anytime')
                  setToggleDropdown(false)
                }}
              >
                Clear All
              </div>
              <div
                className="rounded bg-sky-500 px-4 py-2 text-sm font-bold text-white hover:bg-sky-400"
                onClick={() => {
                  const updatedSearchParams = new URLSearchParams(searchParams.toString())
                  updatedSearchParams.set('delivery_time', selectedTime)
                  updatedSearchParams.set('page', '1')
                  setSearchParams(updatedSearchParams)
                  setToggleDropdown(false)
                }}
              >
                Apply
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 flex h-10 gap-4 text-xs text-slate-950">
        {selectedTime !== 'Anytime' && (
          <Button
            className="flex gap-4 self-center rounded-full bg-gray-200 px-5 py-1 font-bold hover:text-gray-500"
            label={
              <>
                {`Up to ${selectedTime} ${selectedTime === '1' ? 'Day' : 'Days'}`}
                <FaTimes className="self-center font-normal" />
              </>
            }
            onClick={() => {
              const updatedSearchParams = new URLSearchParams(searchParams.toString())
              updatedSearchParams.delete('delivery_time')
              setSearchParams(updatedSearchParams)
              setToggleDropdown(false)
              setSelectedTime('Anytime')
            }}
          />
        )}
      </div>
    </div>
  )
}
