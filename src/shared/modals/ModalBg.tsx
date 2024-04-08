import { IModalBgProps } from 'src/interfaces/modal.interface'

export default function ModalBg({ children }: IModalBgProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-black/[.65] py-2">{children}</div>
    </div>
  )
}
