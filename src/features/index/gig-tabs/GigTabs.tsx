import classNames from 'classnames'
import { useState } from 'react'
import { categories, replaceSpacesWithDash } from 'src/shared/utils/utils.service'
import { v4 as uuidv4 } from 'uuid'

export default function GigTabs() {
  const [activeTab, setActiveTab] = useState<string>('Graphics & Design')
  const categoryGigs = []

  return (
    <div className="relative m-auto mt-8 w-screen px-6 xl:container md:px-12 lg:px-6">
      <div className="mx-auto flex flex-col px-4 py-8 lg:px-6 lg:py-10">
        <div className="flex flex-col text-left">
          <h2 className="mb-3 text-3xl font-bold text-black">A broad selection of services</h2>
          <h4>Choose from a broad selection of services from expert freelancers for your next project.</h4>
        </div>
        <div className="mt-6">
          <ul className="relative inline-block h-72 gap-5 overflow-x-auto scroll-smooth whitespace-nowrap lg:flex lg:h-auto lg:justify-between">
            {categories().map((category: string) => (
              <li
                key={uuidv4()}
                className={classNames('cursor-pointer py-2 font-bold lg:py-0', {
                  'text-black': activeTab === category,
                  'text-gray-400': activeTab !== category
                })}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 h-full overflow-hidden border border-gray-600 px-6 py-6 dark:border-current">
          {categoryGigs.length > 0 ? (
            <>
              <a
                className="mt-10 w-[10%] rounded border border-black px-6 py-3 text-center text-sm font-bold text-black hover:bg-gray-100 focus:outline-none md:px-4 md:py-2 md:text-base"
                href={`/search/categories/${replaceSpacesWithDash(activeTab)}`}
              >
                Explore
              </a>
            </>
          ) : (
            <div className="flex h-96 items-center justify-center text-lg">Information not available at the moment.</div>
          )}
        </div>
      </div>
    </div>
  )
}
