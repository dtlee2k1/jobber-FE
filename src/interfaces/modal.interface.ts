import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from 'react'

export interface IModalBgProps {
  children?: ReactNode
  onClose?: MouseEventHandler<HTMLButtonElement>
  onToggle?: Dispatch<SetStateAction<boolean>>
  onTogglePassword?: Dispatch<SetStateAction<boolean>>
}

export interface IModalProps {
  header?: string
  gigTitle?: string
  // singleMessage?: IMessageDocument
  // order?: IOrderDocument
  // receiver?: IBuyerDocument
  // authUser?: IAuthUser
  type?: string
  approvalModalContent?: IApprovalModalContent
  hideCancel?: boolean
  cancelBtnHandler?: () => void
  onClick?: () => void
  onClose?: () => void
}

export interface IApprovalModalContent {
  header: string
  body: string
  btnText: string
  btnColor: string
}
