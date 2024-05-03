import { useContext } from 'react'
import { GigContext } from 'src/features/gigs/context/GigContext'
import { v4 as uuidv4 } from 'uuid'

export default function GigLeftAbout() {
  const { gig } = useContext(GigContext)

  return (
    <>
      <div className="mt-10 pb-6 text-lg font-semibold">About This Gig</div>
      <div className="pb-6">
        {/* <HtmlParser input={gig.description} /> */}
        {gig.description}
      </div>
      <hr className="border-grey my-3" />
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
        <div className="flex flex-col">
          <span className="text-[#95979d]">Main Categories</span>
          <span className="font-normal">{gig.categories}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#95979d]">Sub Categories</span>
          <div className="flex flex-col">
            {gig?.subCategories.map((category: string, index: number) => (
              <span className="font-normal" key={uuidv4()}>
                {`${category}${index !== gig.subCategories.length - 1 ? ',' : ''}`}&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-grey my-3" />
    </>
  )
}
