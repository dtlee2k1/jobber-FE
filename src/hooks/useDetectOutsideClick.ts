import { MutableRefObject, useCallback, useEffect, useState } from 'react'

export default function useDetectOutsideClick(ref: MutableRefObject<HTMLDivElement | null>, initialState: boolean) {
  const [isActive, setIsActive] = useState<boolean>(initialState)

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(event.target as HTMLDivElement)) {
        setIsActive(!isActive)
      }
    },
    [isActive, ref]
  )

  useEffect(() => {
    isActive && window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [isActive, handleClick])

  return { isActive, setIsActive }
}
