import GigLeftAbout from './GigViewLeft/GigLeftAbout'
import GigLeftOverview from './GigViewLeft/GigLeftOverview'
import GigViewReviews from './GigViewLeft/GigViewReviews'

export default function GigViewLeft() {
  return (
    <>
      <GigLeftOverview />
      <GigLeftAbout />
      <GigViewReviews showRatings={true} hasFetchedReviews={false} />
    </>
  )
}
