import { filter, find } from 'lodash'
import { Dispatch, FormEvent, RefObject, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import useChatScrollToBottom from 'src/hooks/useChatScrollToBottom'
import { IBuyerDocument } from 'src/interfaces/buyer.interface'
import { IMessageDocument } from 'src/interfaces/chat.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { useGetBuyerByUsernameQuery } from 'src/services/buyer.service'
import { useSaveChatMessageMutation } from 'src/services/chat.service'
import { useGetGigByIdQuery } from 'src/services/gig.service'
import Button from 'src/shared/button/Button'
import { updateNotification } from 'src/shared/header/reducers/notification.reducer'
import TextInput from 'src/shared/inputs/TextInput'
import OfferModal from 'src/shared/modals/OfferModal'
import { checkFile, fileType, readAsBase64 } from 'src/shared/utils/image-utils.service'
import { dayMonthYear } from 'src/shared/utils/timeago.utils'
import { firstLetterUppercase, showErrorToast } from 'src/shared/utils/utils.service'
import { socket, socketService } from 'src/sockets/socket.service'
import { useAppDispatch, useAppSelector } from 'src/store/store'

import ChatFile from './ChatFile'
import ChatImagePreview from './ChatImagePreview'
import ChatOffer from './ChatOffer'

interface IChatWindowProps {
  chatMessages: IMessageDocument[]
  isError: boolean
  isLoading: boolean
  setSkip: Dispatch<SetStateAction<boolean>>
}

const NOT_EXISTING_ID = '66336c910a7a25e81c6e8ce6'

export default function ChatWindow({ chatMessages, isLoading, setSkip }: IChatWindowProps) {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)
  const seller = useAppSelector((state: IReduxState) => state.seller)

  const dispatch = useAppDispatch()

  const { username } = useParams<string>()
  const receiverUsername = useRef<string>('')
  const receiverRef = useRef<IBuyerDocument>()
  const singleMessageRef = useRef<IMessageDocument>()
  const fileRef = useRef<HTMLInputElement>(null)

  const [message, setMessage] = useState<string>('')
  const [showImagePreview, setShowImagePreview] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const previewImage = useMemo(() => {
    return selectedFile ? URL.createObjectURL(selectedFile) : ''
  }, [selectedFile])
  const [displayCustomOffer, setDisplayCustomOffer] = useState<boolean>(false)
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false)

  const scrollRef: RefObject<HTMLDivElement> = useChatScrollToBottom([])

  const { data: buyerData, isSuccess: isBuyerSuccess } = useGetBuyerByUsernameQuery(`${firstLetterUppercase(`${username}`)}`)
  const { data: gigData } = useGetGigByIdQuery(singleMessageRef.current ? `${singleMessageRef.current.gigId}` : NOT_EXISTING_ID)

  const [saveChatMessage] = useSaveChatMessageMutation()

  if (isBuyerSuccess) {
    receiverRef.current = buyerData.buyer
  }

  if (chatMessages.length) {
    singleMessageRef.current = chatMessages[chatMessages.length - 1]
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    if (target.files) {
      const file: File = target.files[0]
      const isInvalid = checkFile(file)
      if (!isInvalid) {
        setSelectedFile(file)
        setShowImagePreview(true)
      }
    }
  }

  const setChatMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault()
    if (setSkip) {
      setSkip(true)
    }

    if (!message && !selectedFile) {
      return
    }

    try {
      setIsUploadingFile(true)
      const messageBody: IMessageDocument = {
        conversationId: singleMessageRef?.current?.conversationId,
        hasConversationId: true,
        body: message,
        gigId: singleMessageRef?.current?.gigId,
        sellerId: singleMessageRef?.current?.sellerId,
        buyerId: singleMessageRef?.current?.buyerId,
        senderUsername: `${authUser?.username}`,
        senderPicture: `${authUser?.profilePicture}`,
        receiverUsername: receiverRef?.current?.username,
        receiverPicture: receiverRef?.current?.profilePicture,
        isRead: false,
        hasOffer: false
      }
      if (selectedFile) {
        const dataImage: string | ArrayBuffer | null = await readAsBase64(selectedFile)
        messageBody.file = dataImage as string
        messageBody.body = messageBody.body ? messageBody.body : '1 file sent'
        messageBody.fileType = fileType(selectedFile)
        messageBody.fileName = selectedFile.name
        messageBody.fileSize = `${selectedFile.size}`
      }
      await saveChatMessage(messageBody).unwrap()
      setSelectedFile(null)
      setMessage('')
      setShowImagePreview(false)
      setIsUploadingFile(false)
    } catch (error) {
      setMessage('')
      setIsUploadingFile(false)
      showErrorToast('Error sending message')
    }
  }

  useEffect(() => {
    socketService.setupSocketConnection()
    socket.emit('getLoggedInUsers')
    socket.on('online', (data: string[]) => {
      receiverUsername.current = find(data, (username: string) => username === receiverRef?.current?.username) as string
    })
  }, [])

  useEffect(() => {
    const list: IMessageDocument[] = filter(chatMessages, (item: IMessageDocument) => !item.isRead && item.receiverUsername === username)
    dispatch(updateNotification({ hasUnreadMessage: list.length > 0 }))
  }, [chatMessages, dispatch, username])

  return (
    <>
      {!isLoading && displayCustomOffer && (
        <OfferModal
          header="Create Custom Offer"
          gigTitle={gigData && gigData?.gig?.title ? gigData?.gig?.title : ''}
          singleMessage={singleMessageRef.current}
          receiver={receiverRef.current}
          authUser={authUser}
          cancelBtnHandler={() => setDisplayCustomOffer(false)}
        />
      )}
      {!isLoading && (
        <div className="flex min-h-full w-full flex-col">
          <div className="border-grey flex w-full flex-col border-b px-5 py-0.5 ">
            {receiverUsername.current === receiverRef.current?.username ? (
              <>
                <div className="text-lg font-semibold">{firstLetterUppercase(`${username}`)}</div>
                <div className="flex gap-1 pb-1 text-xs font-normal">
                  Online
                  <span className="flex h-2.5 w-2.5 self-center rounded-full border-2 border-white bg-green-400"></span>
                </div>
              </>
            ) : (
              <>
                <div className="py-2.5 text-lg font-semibold">{firstLetterUppercase(`${username}`)}</div>
                <span className="py-2.5s text-xs font-normal"></span>
              </>
            )}
          </div>
          <div className="relative h-[100%]">
            <div className="absolute flex h-[98%] w-screen grow flex-col overflow-scroll" ref={scrollRef}>
              {chatMessages.map((msg: IMessageDocument) => (
                <div key={msg._id} className="mb-4">
                  <div className="flex w-full cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-[#f5fbff]">
                    <div className="flex self-start">
                      <img className="h-10 w-10 rounded-full object-cover" src={msg.senderPicture} alt="" />
                    </div>
                    <div className="w-full text-sm dark:text-white">
                      <div className="flex gap-x-2 pb-1 font-bold text-[#777d74]">
                        <span>{msg.senderUsername}</span>
                        <span className="mt-1 self-center text-xs font-normal">{dayMonthYear(`${msg.createdAt}`)}</span>
                      </div>
                      <div className="flex flex-col text-[#777d74]">
                        <span>{msg.body}</span>
                        {msg.hasOffer && <ChatOffer message={msg} gig={gigData?.gig} seller={seller} />}
                        {msg.file && <ChatFile message={msg} />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 flex flex-col">
            {showImagePreview && (
              <ChatImagePreview
                image={previewImage}
                file={selectedFile as File}
                isLoading={isUploadingFile}
                message={message}
                handleChange={setChatMessage}
                onRemoveImage={() => {
                  setSelectedFile(null)
                  setShowImagePreview(false)
                }}
                onSubmit={sendMessage}
              />
            )}
            {!showImagePreview && (
              <div className="bottom-0 left-0 right-0 z-0 h-28 px-4 ">
                <form className="mb-1 w-full" onSubmit={sendMessage}>
                  <TextInput
                    type="text"
                    name="message"
                    value={message}
                    onChange={setChatMessage}
                    className="border-grey mb-1 w-full rounded border p-3.5 text-sm font-normal text-gray-600 focus:outline-none"
                    placeholder="Enter your message..."
                  />
                </form>
                <div className="flex cursor-pointer flex-row justify-between">
                  <div className="flex gap-4">
                    <FaPaperclip className="mt-1 self-center" onClick={() => fileRef.current?.click()} />
                    {singleMessageRef.current && singleMessageRef.current.sellerId === seller?._id && (
                      <Button
                        className="rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
                        disabled={false}
                        label="Add Offer"
                        onClick={() => setDisplayCustomOffer(true)}
                      />
                    )}
                    <TextInput
                      ref={fileRef}
                      name="chatFile"
                      type="file"
                      className="hidden"
                      onClick={() => {
                        if (fileRef.current) {
                          fileRef.current.value = ''
                        }
                      }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      className="rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
                      disabled={false}
                      label={<FaPaperPlane className="self-center" />}
                      onClick={sendMessage}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
