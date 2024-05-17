import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IMessageDocument } from 'src/interfaces/chat.interface'
import { useGetUserMessagesQuery } from 'src/services/chat.service'
import { chatMessageReceived } from 'src/shared/utils/chat.utils'

import ChatList from './chatlist/ChatList'
import ChatWindow from './chatwindow/ChatWindow'

export default function Chat() {
  const { conversationId } = useParams<string>()

  const [skip, setSkip] = useState<boolean>(false)
  const [chatMessagesData, setChatMessagesData] = useState<IMessageDocument[]>([])
  const chatMessages = useRef<IMessageDocument[]>([])
  const { data, isSuccess, isLoading, isError } = useGetUserMessagesQuery(`${conversationId}`, { skip }) // only get messages in the first time rendering

  useEffect(() => {
    if (isSuccess) {
      setChatMessagesData(data?.messages as IMessageDocument[])
    }
  }, [isSuccess, data?.messages])

  // update chat messages in real time by websocket
  useEffect(() => {
    chatMessageReceived(`${conversationId}`, chatMessagesData, chatMessages.current, setChatMessagesData)
  }, [chatMessagesData, conversationId])

  return (
    <div className="border-grey mx-2 my-5 flex max-h-[90%] flex-wrap border lg:container lg:mx-auto">
      <div className="lg:border-grey relative w-full overflow-hidden lg:w-1/3 lg:border-r">
        <ChatList />
      </div>

      <div className="relative hidden w-full overflow-hidden md:w-2/3 lg:flex">
        {conversationId && chatMessagesData.length > 0 ? (
          <ChatWindow chatMessages={chatMessagesData} isLoading={isLoading} isError={isError} setSkip={setSkip} />
        ) : (
          <div className="flex w-full items-center justify-center">Select a user to chat with</div>
        )}
      </div>
    </div>
  )
}
