import { FaDownload, FaRegFileArchive, FaRegPlayCircle } from 'react-icons/fa'
import { IMessageDocument } from 'src/interfaces/chat.interface'
import { bytesToSize, checkUrlExtension } from 'src/shared/utils/image-utils.service'
import { downloadFile, getFileBlob, showErrorToast } from 'src/shared/utils/utils.service'

interface IChatFileProps {
  message: IMessageDocument
}

export default function ChatFile({ message }: IChatFileProps) {
  const downloadChatFile = async (url: string, fileName: string) => {
    try {
      const response = await getFileBlob(url)
      const blobUrl = URL.createObjectURL(new Blob([response.data]))
      downloadFile(blobUrl, fileName)
    } catch (error) {
      showErrorToast('Error downloading file')
    }
  }

  return (
    <div className="flex w-64 min-w-[100%] flex-col">
      <div className="z-1 mt-2 flex flex-col rounded">
        {checkUrlExtension(`${message.fileType}`) === 'image' && <img className="h-36 w-64 object-contain" src={message.file} alt="" />}
        {checkUrlExtension(`${message.fileType}`) === 'zip' && (
          <div className="border-grey relative flex h-[120px] w-64 items-center justify-center rounded-md border">
            <FaRegFileArchive className="absolute" size={25} />
          </div>
        )}
        {checkUrlExtension(`${message.fileType}`) === 'video' && (
          <div className="border-grey relative flex h-[150px] w-64 items-center justify-center rounded-md border">
            <FaRegPlayCircle className="absolute" size={25} />
            <video width="100%" src="" />
          </div>
        )}
      </div>
      <div className="flex w-auto justify-between">
        <div className="flex gap-1 truncate" onClick={() => downloadChatFile(`${message.file}`, `${message.fileName}`)}>
          <FaDownload size={10} className="flex self-center" />
          <span className="truncate text-xs md:text-sm">{message.fileName}</span>
        </div>
        <span className="truncate text-xs md:text-sm">({bytesToSize(parseInt(`${message.fileSize}`))})</span>
      </div>
    </div>
  )
}
