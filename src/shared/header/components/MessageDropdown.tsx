import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaEye, FaRegEnvelope, FaRegEnvelopeOpen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { IMessageDocument } from 'src/interfaces/chat.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { useGetConversationListQuery, useMarkMessagesAsReadMutation } from 'src/services/chat.service'
import { transform } from 'src/shared/utils/timeago.utils'
import { lowerCase, showErrorToast } from 'src/shared/utils/utils.service'
import { useAppSelector } from 'src/store/store'

export interface IMessageDropdownProps {
  setIsMessageDropdownOpen: Dispatch<SetStateAction<boolean>>
}

export default function MessageDropdown({ setIsMessageDropdownOpen }: IMessageDropdownProps) {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)
  const navigate = useNavigate()

  const [conversations, setConversations] = useState<IMessageDocument[]>([])

  const { data, isSuccess } = useGetConversationListQuery(`${authUser.username}`, { refetchOnMountOrArgChange: true })
  const [markMessagesAsRead] = useMarkMessagesAsReadMutation()

  useEffect(() => {
    if (isSuccess) {
      setConversations(data.conversations as IMessageDocument[])
    }
  }, [isSuccess, data?.conversations])

  const selectInboxMessage = async (message: IMessageDocument) => {
    try {
      const chatUsername =
        message.receiverUsername !== authUser.username ? String(message.receiverUsername) : String(message.senderUsername)
      navigate(`/inbox/${lowerCase(chatUsername)}/${message.conversationId}`)

      if (message.receiverUsername === authUser.username && !message.isRead) {
        markMessagesAsRead(`${message._id}`)
      }
    } catch (error) {
      showErrorToast('Error occurred')
    }
  }

  return (
    <div className="border-grey border-grey z-20 flex max-h-[470px] flex-col justify-between rounded border bg-white shadow-md">
      <div className="border-grey block border-b px-4 py-2 text-center font-medium text-gray-700">Inbox</div>
      <div className="h-96 overflow-y-scroll">
        {conversations.length > 0 ? (
          <>
            {conversations.map((data: IMessageDocument) => (
              <div
                key={data._id}
                className="border-grey max-h-[90px] border-b pt-2 text-left hover:bg-gray-50 "
                onClick={() => {
                  selectInboxMessage(data)
                  if (setIsMessageDropdownOpen) {
                    setIsMessageDropdownOpen(false)
                  }
                }}
              >
                <div className="flex px-4">
                  <div className="mt-1 flex-shrink-0">
                    <img
                      className="h-11 w-11 rounded-full object-cover"
                      src={data.receiverUsername !== authUser.username ? data.receiverPicture : data.senderPicture}
                      alt=""
                    />
                  </div>
                  <div className="w-full pl-3 pt-1">
                    <div className="flex flex-col text-sm font-normal ">
                      <div className="flex justify-between font-bold leading-none">
                        {data.receiverUsername !== authUser.username ? data.receiverUsername : data.senderUsername}
                        {!data.isRead ? <FaRegEnvelope className="text-sky-400" /> : <FaRegEnvelopeOpen className="text-gray-200" />}
                      </div>
                      <span className="line-clamp-1 pt-1 font-normal leading-4">
                        {data.receiverUsername !== authUser?.username ? 'Me: ' : ''}
                        {data.body}
                      </span>
                    </div>
                    <div className="mt-1 flex text-[11px]">
                      {data.createdAt && <span className="font-normal text-[#b5b6ba]">{transform(data.createdAt)}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">No messages to show</div>
        )}
      </div>
      <div
        className="flex h-10 cursor-pointer justify-center bg-white px-4 text-sm font-medium text-sky-500"
        onClick={() => {
          navigate('/inbox')
          if (setIsMessageDropdownOpen) {
            setIsMessageDropdownOpen(false)
          }
        }}
      >
        <FaEye className="mr-2 h-4 w-4 self-center" />
        <span className="self-center">View all</span>
      </div>
    </div>
  )
}
