import { orderBy } from 'lodash'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaRegEnvelope, FaRegEnvelopeOpen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { IOrderNotification } from 'src/interfaces/order.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { useGetNotificationsByIdQuery, useMarkUnreadNotificationMutation } from 'src/services/notification.service'
import { transform } from 'src/shared/utils/timeago.utils'
import { showErrorToast } from 'src/shared/utils/utils.service'
import { useAppSelector } from 'src/store/store'
import { v4 as uuidv4 } from 'uuid'

export interface INotificationDropdownProps {
  setIsNotificationDropdownOpen: Dispatch<SetStateAction<boolean>>
}

export default function NotificationDropdown({ setIsNotificationDropdownOpen }: INotificationDropdownProps) {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState<IOrderNotification[]>([])

  const { data, isSuccess } = useGetNotificationsByIdQuery(`${authUser.username}`, { refetchOnMountOrArgChange: true })
  const [markUnReadNotification] = useMarkUnreadNotificationMutation()

  const markNotificationAsRead = async (notificationId: string): Promise<void> => {
    try {
      await markUnReadNotification(notificationId).unwrap()
    } catch (error) {
      showErrorToast('Error marking unread notification')
    }
  }

  useEffect(() => {
    if (isSuccess) {
      const sortedNotifications: IOrderNotification[] = orderBy(data.notifications, ['createdAt'], ['desc']) as IOrderNotification[]
      setNotifications(sortedNotifications)
    }
  }, [isSuccess, data?.notifications])

  return (
    <div className="border-grey border-grey z-20 flex max-h-[470px] flex-col justify-between rounded border bg-white shadow-md">
      <div className="border-grey block border-b px-4 py-2 text-center font-medium text-gray-700">Notifications</div>
      <div className="h-96 overflow-y-scroll">
        {notifications.length > 0 &&
          notifications.map((data: IOrderNotification) => (
            <div
              key={uuidv4()}
              className="border-grey max-h-[90px] border-b py-2 text-left hover:bg-gray-50"
              onClick={() => {
                setIsNotificationDropdownOpen(false)
                navigate(`/orders/${data.orderId}/activities`)
                markNotificationAsRead(`${data._id}`)
              }}
            >
              <div className="flex px-4">
                <div className="mt-1 flex-shrink-0">
                  <img
                    className="h-11 w-11 rounded-full object-cover"
                    src={data.senderUsername === authUser?.username ? data.receiverPicture : data.senderPicture}
                    alt=""
                  />
                </div>
                <div className="w-full pl-3 pt-2">
                  <div className="flex justify-between text-[13px] font-normal leading-4">
                    <div className="w-[85%] font-normal">
                      <span className="pr-1 font-bold">
                        {data.senderUsername === authUser?.username ? data.receiverUsername : data.senderUsername}
                      </span>
                      {data.message}
                    </div>
                    {!data.isRead ? <FaRegEnvelope className="mt-1 text-sky-400" /> : <FaRegEnvelopeOpen className="mt-1 text-gray-200" />}
                  </div>
                  <div className="flex gap-2 text-[11px]">
                    <span className="font-normal text-[#b5b6ba]">{transform(data?.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {notifications.length === 0 && <div className="flex h-full items-center justify-center">No notifications to show</div>}
      </div>
    </div>
  )
}
