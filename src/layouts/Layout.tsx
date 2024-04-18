import { ReactNode } from 'react'

interface LayoutProps {
  backgroundColor: string
  children: ReactNode
}

export default function Layout({ backgroundColor = '#fff', children }: LayoutProps) {
  return (
    <div style={{ backgroundColor }} className="flex flex-grow">
      {children}
    </div>
  )
}
