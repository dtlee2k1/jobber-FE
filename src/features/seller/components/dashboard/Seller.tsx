import { Outlet } from 'react-router-dom'
import { IReduxState } from 'src/interfaces/store.interface'
import DashBoardHeader from 'src/shared/header/components/DashBoardHeader'
import { useAppSelector } from 'src/store/store'

export default function Seller() {
  const header = useAppSelector((state: IReduxState) => state.header)

  return (
    <div className="w-screen">
      {header === 'sellerDashboard' && <DashBoardHeader />}
      <div className="relative m-auto min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
        <Outlet />
      </div>
    </div>
  )
}
