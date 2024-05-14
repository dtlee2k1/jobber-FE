import { useRef, useState } from 'react'
import { FaCircleNotch, FaPaperclip, FaRegFile, FaTimes } from 'react-icons/fa'
import { IDeliveredWork, IOrderDocument } from 'src/interfaces/order.interface'
import { useDeliverOrderMutation } from 'src/services/order.service'

import Button from '../button/Button'
import TextAreaInput from '../inputs/TextAreaInput'
import TextInput from '../inputs/TextInput'
import { bytesToSize, checkFile, fileType, readAsBase64 } from '../utils/image-utils.service'
import { showErrorToast, showSuccessToast } from '../utils/utils.service'
import ModalBg from './ModalBg'

interface IDeliverWorkModalProps {
  order: IOrderDocument
  onClose: () => void
}

export default function DeliverWorkModal({ order, onClose }: IDeliverWorkModalProps) {
  const [description, setDescription] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showImagePreview, setShowImagePreview] = useState<boolean>(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const [deliverOrder, { isLoading }] = useDeliverOrderMutation()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    if (target.files) {
      const file: File = target.files[0]
      if (!checkFile(file)) {
        setSelectedFile(file)
        setShowImagePreview(true)
      }
    }
  }

  const deliverWork = async () => {
    try {
      const selectedWorkFile = selectedFile as File
      const dataImage: string | ArrayBuffer | null = await readAsBase64(selectedWorkFile)

      const completedWork: IDeliveredWork = {
        message: description,
        file: dataImage as string,
        fileType: fileType(selectedWorkFile),
        fileSize: selectedWorkFile.size,
        fileName: selectedWorkFile.name
      }
      await deliverOrder({ orderId: `${order?.orderId}`, body: completedWork })

      onClose()
      showSuccessToast('Order delivered successfully')
    } catch (error) {
      showErrorToast('Error delivering order')
    }
  }

  return (
    <ModalBg>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[30] flex w-full items-center justify-center">
        {isLoading && (
          <div className="fixed bottom-0 left-0 right-0 top-0 z-[50] flex w-full items-center justify-center opacity-80">
            <div className="absolute bottom-auto left-auto right-auto top-auto flex min-h-[280px] min-w-[500px] flex-col items-center justify-center bg-white p-4 text-[#404145]">
              <FaCircleNotch className="animate-spin" size={40} color="#50b5ff" />
              <span>Uploading...</span>
            </div>
          </div>
        )}

        {!isLoading && (
          <div>
            <div className="relative bottom-auto left-auto right-auto top-auto max-h-[90vh] min-w-[500px] bg-white p-4">
              <div className="mb-5 w-full text-left">
                <h4 className="text-base font-bold">Deliver your work</h4>
                <p>Images, Pdfs, Videos or Zip: Max. 1GB</p>
              </div>
              <div>
                <TextAreaInput
                  className="w-full rounded-t-lg border border-[#f1f1f1] p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                  name="description"
                  placeholder="Add a response to buyer..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
                {showImagePreview && (
                  <div className="mb-5">
                    <div className="flex rounded pb-2">
                      <div className="flex h-[80px] w-[100px] flex-col items-center justify-center rounded border border-[#f1f1f1] p-3">
                        <FaRegFile className="text-gray-200" size={25} />
                        <span className="w-[100px] truncate px-3 py-1 text-xs font-bold text-black">{selectedFile?.name}</span>
                        <p className="mb-0 text-xs">{bytesToSize(parseInt(`${selectedFile?.size}`))}</p>
                      </div>
                      <FaTimes
                        className="absolute right-[18px] mt-[5px] cursor-pointer text-[#bdbdbd]"
                        onClick={() => {
                          setSelectedFile(null)
                          setShowImagePreview(false)
                        }}
                      />
                    </div>
                  </div>
                )}

                {!showImagePreview && (
                  <div
                    className="mt-2 flex w-[30%] cursor-pointer gap-2 rounded bg-[#efefef] px-[0.75rem] py-[0.3rem]"
                    onClick={() => fileRef.current?.click()}
                  >
                    <FaPaperclip className="flex self-center" />
                    <span className="bg-transparent text-sm">Upload work</span>
                    <TextInput
                      name="chatFile"
                      ref={fileRef}
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
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  className="rounded bg-gray-200 px-6 py-3 text-center text-sm font-bold text-black focus:outline-none md:px-4 md:py-2 md:text-base"
                  label="Cancel"
                  onClick={onClose}
                />
                <Button
                  disabled={!description || !selectedFile}
                  className={`rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base ${
                    !description || !selectedFile ? 'cursor-not-allowed bg-sky-200' : 'cursor-pointer bg-sky-500 hover:bg-sky-400'
                  }`}
                  label="Deliver"
                  onClick={deliverWork}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalBg>
  )
}