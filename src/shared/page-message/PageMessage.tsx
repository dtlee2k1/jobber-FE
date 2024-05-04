import { useNavigate } from 'react-router-dom'

import Button from '../button/Button'

interface IPageMessageProps {
  header: string
  body: string
}

export default function PageMessage({ header, body }: IPageMessageProps) {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-center text-xl font-extrabold md:text-2xl lg:text-4xl">{header}</h1>
      <p className="mt-4 w-1/3 text-center text-base md:text-lg">{body}</p>
      <Button
        onClick={() => navigate('/')}
        disabled={false}
        className="mt-5 rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
        label="Back to Home page"
      />
    </div>
  )
}
