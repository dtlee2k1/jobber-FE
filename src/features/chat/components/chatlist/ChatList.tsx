import classNames from 'classnames'
import { useRef, useState } from 'react'
import { FaCheck, FaCheckDouble, FaCircle } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IMessageDocument } from 'src/interfaces/chat.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { useGetConversationListQuery, useMarkMultipleMessagesAsReadMutation } from 'src/services/chat.service'
import { transform } from 'src/shared/utils/timeago.utils'
import { useAppDispatch, useAppSelector } from 'src/store/store'

export default function ChatList() {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)

  const [selectedUser, setSelectedUser] = useState<IMessageDocument>()
  const conversationsListRef = useRef<IMessageDocument[]>([])
  const [chatList, setChatList] = useState<IMessageDocument[]>([])

  const { username, conversationId } = useParams<string>()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const { data, isSuccess } = useGetConversationListQuery(`${authUser.username}`)
  const [markMultipleMessagesAsRead] = useMarkMultipleMessagesAsReadMutation()
  return (
    <>
      <div className="border-grey truncate border-b px-5 py-3 text-base font-medium">
        <h2 className="w-6/12 truncate text-sm md:text-base lg:text-lg">All Conversations</h2>
      </div>
      <div className="absolute h-full w-full overflow-scroll pb-14">
        {chatList.map((data: IMessageDocument, index: number) => (
          <div
            key={data._id}
            className={classNames('flex w-full cursor-pointer items-center space-x-4 px-5 py-4 hover:bg-gray-50', {
              'border-grey border-b': index !== chatList.length - 1,
              'bg-[#f5fbff]': !data.isRead || data.conversationId === conversationId
            })}
          >
            <LazyLoadImage
              src={data.receiverUsername !== authUser?.username ? data.receiverPicture : data.senderPicture}
              alt="profile image"
              className="h-10 w-10 rounded-full object-cover"
              placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
              effect="blur"
              wrapperClassName="h-10 w-10 object-cover rounded-full"
            />
            <div className="w-full text-sm dark:text-white">
              <div className="flex justify-between pb-1 font-bold text-[#777d74]">
                <span className={`${selectedUser && !data.body ? 'flex items-center' : ''}`}>
                  {data.receiverUsername !== authUser?.username ? data.receiverUsername : data.senderUsername}
                </span>
                {data.createdAt && <span className="font-normal">{transform(`${data.createdAt}`)}</span>}
              </div>
              <div className="flex justify-between text-[#777d74]">
                <span>
                  {data.receiverUsername === authUser.username ? '' : 'Me: '}
                  {data.body}
                </span>
                {!data.isRead ? (
                  <>
                    {data.receiverUsername === authUser.username ? (
                      <FaCircle className="mt-2 text-sky-500" size={8} />
                    ) : (
                      <FaCheck className="mt-2" size={8} />
                    )}
                  </>
                ) : (
                  <FaCheckDouble className="mt-2 text-sky-500" size={8} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
