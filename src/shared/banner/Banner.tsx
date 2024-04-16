import { FaExclamationTriangle } from 'react-icons/fa'

interface IBannerProps {
  bgColor: string
  text: string
  showLink: boolean
  linkText?: string
  onClick?: () => void
}

export default function Banner({ bgColor, showLink, text, linkText, onClick }: IBannerProps) {
  return (
    <div className={`left-0 top-0 z-50 flex w-full justify-between p-4 ${bgColor}`}>
      <div className="mx-auto flex items-center">
        <div className="flex items-center text-sm font-bold text-white">
          <span className="mr-1 inline-flex rounded-full p-1">
            <FaExclamationTriangle className="h-4 w-4 text-white" />
          </span>
          <span className="flex gap-2">
            {text}
            {showLink && (
              <div onClick={onClick} className="inline cursor-pointer font-medium text-blue-500 no-underline hover:underline">
                {linkText}
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
