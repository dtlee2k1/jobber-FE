import GigPackage from './GigViewRight/GigPackage'
import GigRelatedTags from './GigViewRight/GigRelatedTags'
import GigSeller from './GigViewRight/GigSeller'

export default function GigViewRight() {
  return (
    <>
      <GigPackage />
      <GigSeller />
      <GigRelatedTags />
    </>
  )
}
