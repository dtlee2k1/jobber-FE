import { Outlet } from 'react-router-dom'
import DashBoardHeader from 'src/shared/header/DashBoardHeader'

export default function Seller() {
  return (
    <div className="w-screen">
      <DashBoardHeader />
      <div className="relative m-auto min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
        <Outlet />
      </div>
    </div>
  )
}
