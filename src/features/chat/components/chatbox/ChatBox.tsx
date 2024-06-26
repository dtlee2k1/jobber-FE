import { FormEvent, RefObject, useEffect, useRef, useState } from 'react'
import { FaPaperPlane, FaTimes } from 'react-icons/fa'
import useChatScrollToBottom from 'src/hooks/useChatScrollToBottom'
import { IChatBuyerProps, IChatSellerProps, IConversationDocument, IMessageDocument } from 'src/interfaces/chat.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { IResponse } from 'src/interfaces/utils.interface'
import { useGetConversationQuery, useGetMessagesQuery, useSaveChatMessageMutation } from 'src/services/chat.service'
import Button from 'src/shared/button/Button'
import TextInput from 'src/shared/inputs/TextInput'
import { chatMessageReceived } from 'src/shared/utils/chat.utils'
import { generateRandomNumber, showErrorToast } from 'src/shared/utils/utils.service'
import { useAppSelector } from 'src/store/store'
import { v4 as uuidv4 } from 'uuid'

import ChatBoxSkeleton from './ChatBoxSkeleton'

interface IChatBoxProps {
  seller: IChatSellerProps
  buyer: IChatBuyerProps
  gigId: string
  onClose: () => void
}

export default function ChatBox({ seller, buyer, gigId, onClose }: IChatBoxProps) {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)

  const [skip, setSkip] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [chatMessagesData, setChatMessagesData] = useState<IMessageDocument[]>([])
  const chatMessages = useRef<IMessageDocument[]>([])
  const conversationIdRef = useRef<string>(`${generateRandomNumber(15)}`)

  const { data: conversationData, isSuccess: isConversationSuccess } = useGetConversationQuery({
    senderUsername: `${seller.username}`,
    receiverUsername: `${buyer.username}`
  })
  const {
    data: messagesData,
    isLoading: isMessagesLoading,
    isSuccess: isMessagesSuccess
  } = useGetMessagesQuery({ senderUsername: `${seller.username}`, receiverUsername: `${buyer.username}` }, { skip }) // only get messages in the first time rendering

  if (isConversationSuccess && conversationData.conversations && conversationData.conversations.length) {
    conversationIdRef.current = (conversationData.conversations[0] as IConversationDocument).conversationId
  }
  const scrollRef: RefObject<HTMLDivElement> = useChatScrollToBottom(chatMessagesData)

  const [saveChatMessage] = useSaveChatMessageMutation()

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault()
    if (!message) {
      return
    }
    setSkip(true)
    try {
      const messageBody: IMessageDocument = {
        conversationId: conversationIdRef.current,
        hasConversationId: conversationData && conversationData.conversations && conversationData.conversations.length > 0,
        body: message,
        gigId,
        sellerId: seller._id,
        buyerId: buyer._id,
        senderUsername: authUser.username === seller.username ? seller.username : buyer.username,
        senderPicture: authUser.username === seller.username ? seller.profilePicture : buyer.profilePicture,
        receiverUsername: authUser.username !== seller.username ? seller.username : buyer.username,
        receiverPicture: authUser.username !== seller.username ? seller.profilePicture : buyer.profilePicture,
        isRead: false,
        hasOffer: false
      }
      const response: IResponse = await saveChatMessage(messageBody).unwrap()

      setMessage('')
      conversationIdRef.current = `${response.conversationId}`
    } catch (error) {
      showErrorToast('Error sending message')
    }
  }

  useEffect(() => {
    if (isMessagesSuccess) {
      setChatMessagesData(messagesData?.messages as IMessageDocument[])
    }
  }, [isMessagesSuccess, messagesData?.messages])

  // update chat messages in real time by websocket
  useEffect(() => {
    chatMessageReceived(`${conversationIdRef.current}`, chatMessagesData, chatMessages.current, setChatMessagesData)
  }, [chatMessagesData])

  return (
    <>
      {isMessagesLoading && !chatMessagesData ? (
        <ChatBoxSkeleton />
      ) : (
        <div className="border-grey fixed bottom-0 left-2 right-2 h-[400px] max-h-[500px] w-auto border bg-white md:left-8 md:h-96 md:max-h-[500px] md:w-96">
          <div className="border-grey flex items-center space-x-4 border-b px-5 py-2">
            <img
              src={authUser.username !== seller.username ? seller.profilePicture : buyer.profilePicture}
              className="h-10 w-10 rounded-full"
              alt="profile image"
            />
            <div className="w-full font-medium text-[#777d74]">
              <div className="flex w-full cursor-pointer justify-between text-sm font-bold text-[#777d74] md:text-base">
                <span>{authUser.username !== seller.username ? seller.username : buyer.username}</span>
                <FaTimes className="flex self-center" onClick={onClose} />
              </div>
              <div className="text-xs text-gray-500">
                Avg. response time: {seller.responseTime} hour{seller.responseTime === 1 ? '' : 's'}
              </div>
            </div>
          </div>

          <div className="h-[500px] overflow-y-scroll md:h-full">
            <div className="my-2 flex h-[280px] flex-col overflow-y-scroll px-4 md:h-[72%]" ref={scrollRef}>
              {chatMessagesData.map((msg: IMessageDocument) => (
                <div
                  key={uuidv4()}
                  className={`my-2 flex max-w-[300px] gap-y-6 text-sm ${msg.senderUsername !== buyer.username ? 'self-start' : 'self-end'}`}
                >
                  {msg.senderUsername !== buyer.username && (
                    <img src={seller.profilePicture} className="h-8 w-8 rounded-full object-cover" alt={buyer.username} />
                  )}

                  <p
                    className={`ml-2 max-w-[200px] rounded-[10px] px-4 py-2 text-start text-sm font-normal md:max-w-[220px] ${
                      msg.senderUsername !== buyer.username ? 'max-w-[200px] rounded-[10px] bg-sky-500 text-white' : 'bg-[#e4e6eb]'
                    }`}
                  >
                    {msg.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={sendMessage} className="absolute bottom-0 left-0 right-0 mb-1 flex px-2 ">
            <TextInput
              type="text"
              name="message"
              placeholder="Enter your message..."
              className="border-grey mb-0 w-full rounded-l-lg border p-2 text-sm font-normal text-gray-600 focus:outline-none"
              value={message}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)}
            />
            <Button
              className="rounded-r-lg bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-3 md:text-base"
              label={<FaPaperPlane className="self-center" />}
            />
          </form>
        </div>
      )}
    </>
  )
}
