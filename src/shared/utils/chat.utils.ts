import { UnknownAction } from '@reduxjs/toolkit'
import { cloneDeep, filter, findIndex, remove } from 'lodash'
import { Dispatch, SetStateAction } from 'react'
import { IMessageDocument } from 'src/interfaces/chat.interface'
import { socket } from 'src/sockets/socket.service'

import { updateNotification } from '../header/reducers/notification.reducer'
import { lowerCase } from './utils.service'

export const chatMessageReceived = (
  conversationId: string,
  chatMessagesData: IMessageDocument[],
  chatMessages: IMessageDocument[],
  setChatMessagesData: Dispatch<SetStateAction<IMessageDocument[]>>
) => {
  socket.on('message_received', (data: IMessageDocument) => {
    chatMessages = cloneDeep(chatMessagesData)

    if (data.conversationId === conversationId) {
      chatMessages.push(data)
      // Filter to remove duplicates chat messages
      const uniqueMessages = chatMessages.filter((msg: IMessageDocument, index: number, list: IMessageDocument[]) => {
        const itemIndex = list.findIndex((item: IMessageDocument) => item._id === msg._id)
        return itemIndex === index
      })
      setChatMessagesData(uniqueMessages)
    }
  })
}

export const chatListMessageReceived = (
  username: string,
  chatList: IMessageDocument[],
  conversationListRef: IMessageDocument[],
  dispatch: Dispatch<UnknownAction>,
  setChatList: Dispatch<SetStateAction<IMessageDocument[]>>
): void => {
  socket.on('message_received', (data: IMessageDocument) => {
    conversationListRef = cloneDeep(chatList)

    if (
      lowerCase(`${data.receiverUsername}`) === lowerCase(`${username}`) ||
      lowerCase(`${data.senderUsername}`) === lowerCase(`${username}`)
    ) {
      // remove duplicates conversation or remove the old top message in each conversation of the list
      const messageIndex = findIndex(chatList, ['conversationId', data.conversationId])
      if (messageIndex !== -1) {
        remove(conversationListRef, (msg: IMessageDocument) => msg.conversationId === data.conversationId)
      } else {
        remove(conversationListRef, (msg: IMessageDocument) => msg.receiverUsername === data.receiverUsername)
      }
      conversationListRef = [data, ...conversationListRef]
      if (lowerCase(`${data.receiverUsername}`) === lowerCase(`${username}`)) {
        const list: IMessageDocument[] = filter(
          conversationListRef,
          (msg: IMessageDocument) => !msg.isRead && msg.receiverUsername === username
        )
        dispatch(updateNotification({ hasUnreadMessage: list.length > 0 }) as UnknownAction)
      }
      setChatList(conversationListRef)
    }
  })
}

export const chatListMessageUpdated = (
  username: string,
  chatList: IMessageDocument[],
  conversationListRef: IMessageDocument[],
  dispatch: Dispatch<UnknownAction>,
  setChatList: Dispatch<SetStateAction<IMessageDocument[]>>
): void => {
  socket.on('message_updated', (data: IMessageDocument) => {
    conversationListRef = cloneDeep(chatList)
    if (
      lowerCase(`${data.receiverUsername}`) === lowerCase(`${username}`) ||
      lowerCase(`${data.senderUsername}`) === lowerCase(`${username}`)
    ) {
      const messageIndex = findIndex(chatList, ['conversationId', data.conversationId])
      if (messageIndex !== -1) {
        conversationListRef.splice(messageIndex, 1, data)
      }
      if (lowerCase(`${data.receiverUsername}`) === lowerCase(`${username}`)) {
        const list: IMessageDocument[] = filter(
          conversationListRef,
          (msg: IMessageDocument) => !msg.isRead && msg.receiverUsername === username
        )
        dispatch(updateNotification({ hasUnreadMessage: list.length > 0 }) as UnknownAction)
      }
      setChatList(conversationListRef)
    }
  })
}
