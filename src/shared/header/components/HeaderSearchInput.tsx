import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/shared/button/Button'
import TextInput from 'src/shared/inputs/TextInput'
import { useAppDispatch } from 'src/store/store'

import { updateHeader } from '../reducers/header.reducer'

export default function HeaderSearchInput() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const navigateToSearchPage = () => {
    dispatch(updateHeader('home'))
    navigate({
      pathname: '/search/gigs',
      search: createSearchParams({ query: searchTerm.trim() }).toString()
    })
  }

  return (
    <div className="mb-4 mt-1 flex h-10 w-full self-center opacity-100 md:mb-0 md:mt-0">
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          navigateToSearchPage()
        }}
        className="flex w-full self-center border opacity-100"
      >
        <TextInput
          type="text"
          name="search"
          value={searchTerm}
          placeholder="What service are you looking for today?"
          className="w-full truncate px-4 py-[7.5px]"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value)
          }}
        />
      </form>
      <Button
        className="flex w-16 items-center justify-center bg-gray-900 text-white"
        label={<FaSearch className="h-6 w-6 fill-white text-white" />}
        onClick={navigateToSearchPage}
      />
    </div>
  )
}
