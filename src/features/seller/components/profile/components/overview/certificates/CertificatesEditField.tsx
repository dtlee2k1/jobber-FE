import { cloneDeep, filter } from 'lodash'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { SellerContext } from 'src/features/seller/context/SellerContext'
import { ICertificate } from 'src/interfaces/seller.interface'
import Button from 'src/shared/button/Button'
import Dropdown from 'src/shared/dropdown/Dropdown'
import TextInput from 'src/shared/inputs/TextInput'
import { yearsList } from 'src/shared/utils/utils.service'

export interface ICertificateEditProps {
  type: string
  selectedCertificate?: ICertificate
  setShowCertificateAddForm?: Dispatch<SetStateAction<boolean>>
  setShowCertificateEditForm?: Dispatch<SetStateAction<boolean>>
}

export default function CertificatesEditField({
  type,
  selectedCertificate,
  setShowCertificateAddForm,
  setShowCertificateEditForm
}: ICertificateEditProps) {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext)

  const [certificateItem, setCertificateItem] = useState<ICertificate>({
    name: selectedCertificate && selectedCertificate.name ? selectedCertificate.name : '',
    from: selectedCertificate && selectedCertificate.from ? selectedCertificate.from : '',
    year: selectedCertificate && selectedCertificate.year ? selectedCertificate.year : 'Year'
  })

  const onHandleUpdate = () => {
    if (type === 'add') {
      const newItem: ICertificate = {
        name: certificateItem.name,
        from: certificateItem.from,
        year: certificateItem.year
      }

      const clonedCertificates: ICertificate[] = cloneDeep(sellerProfile.certificates)
      clonedCertificates.push(newItem)
      setSellerProfile && setSellerProfile({ ...sellerProfile, certificates: clonedCertificates })
      setShowCertificateAddForm && setShowCertificateAddForm(false)
    } else {
      const updatedItem: ICertificate = {
        _id: selectedCertificate?._id,
        name: certificateItem.name,
        from: certificateItem.from,
        year: certificateItem.year
      }
      const clonedCertificates: ICertificate[] = cloneDeep(sellerProfile.certificates)
      const updatedCertificates = clonedCertificates.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      const filteredCertificates: ICertificate[] = filter(
        updatedCertificates,
        (item: ICertificate) => item.name !== '' && item.from !== '' && item.year !== 'Year'
      )
      if (filteredCertificates.length > 0 && setSellerProfile && setShowCertificateEditForm) {
        setSellerProfile({ ...sellerProfile, certificates: filteredCertificates })
        setShowCertificateEditForm(false)
      }
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-16 px-3">
        <TextInput
          className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
          placeholder="Certificate or Award"
          type="text"
          name="name"
          value={certificateItem.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCertificateItem({ ...certificateItem, name: e.target.value })}
        />
        <TextInput
          className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
          placeholder="Certificate From (e.g: Google)"
          type="text"
          name="from"
          value={certificateItem.from}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCertificateItem({ ...certificateItem, from: e.target.value })}
        />
        <div className="relative">
          <Dropdown
            text={`${certificateItem.year}`}
            maxHeight="300"
            mainClassNames="absolute bg-white z-50"
            values={yearsList(50)}
            onClick={(value: string) => {
              setCertificateItem((certificate) => ({ ...certificate, year: value }))
            }}
          />
        </div>
      </div>
      <div className="z-20 my-4 mt-10 flex cursor-pointer justify-center md:z-0 md:mt-0">
        <Button
          disabled={type === 'add' && (certificateItem.year === 'Year' || !certificateItem.name || !certificateItem.from)}
          className={`md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2
          ${
            (certificateItem.year === 'Year' || !certificateItem.name || !certificateItem.from) && type === 'add'
              ? 'cursor-not-allowed opacity-40'
              : 'cursor-pointer'
          }
          `}
          label={type === 'add' ? 'Add' : 'Update'}
          onClick={onHandleUpdate}
        />
        &nbsp;&nbsp;
        <Button
          className="md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2"
          label="Cancel"
          onClick={() => {
            type === 'add' && setShowCertificateAddForm && setShowCertificateAddForm(false)
            type === 'edit' && setShowCertificateEditForm && setShowCertificateEditForm(false)
          }}
        />
      </div>
    </div>
  )
}
