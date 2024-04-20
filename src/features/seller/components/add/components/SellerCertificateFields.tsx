import { Dispatch, SetStateAction } from 'react'
import { ICertificate } from 'src/interfaces/seller.interface'
import Button from 'src/shared/button/Button'
import Dropdown from 'src/shared/dropdown/Dropdown'
import TextInput from 'src/shared/inputs/TextInput'
import { yearsList } from 'src/shared/utils/utils.service'
import { v4 as uuidv4 } from 'uuid'

interface ICertificateProps {
  selectedField?: ICertificate
  certificatesFields: ICertificate[]
  setCertificatesFields: Dispatch<SetStateAction<ICertificate[]>>
  setShowCertificateAddForm?: Dispatch<SetStateAction<boolean>>
  setShowCertificateEditForm?: Dispatch<SetStateAction<boolean>>
}

export default function SellerCertificateFields({ certificatesFields, setCertificatesFields }: ICertificateProps) {
  const handleCertificateFieldsChange = (e: React.ChangeEvent, index: number) => {
    const target = e.target as HTMLInputElement
    const data = [...certificatesFields]

    data[index][target.name] = target.value
    setCertificatesFields(data)
  }

  const addCertificateFields = () => {
    const newField: ICertificate = {
      id: uuidv4(),
      name: '',
      from: '',
      year: 'Year'
    }
    setCertificatesFields([...certificatesFields, newField])
  }

  const removeCertificateFields = (index: number) => {
    const data = [...certificatesFields]
    data.splice(index, 1)

    setCertificatesFields(data)
  }

  return (
    <div className="border-grey flex min-h-[250px] w-full flex-col border-b px-6 pb-3 pt-6">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold">Awards/Certificates</h2>
        <Button
          className="md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8"
          label="Add More"
          onClick={addCertificateFields}
        />
      </div>

      {certificatesFields.map((field, index) => (
        <div key={`${field.id}`}>
          <div className="flex flex-col">
            <TextInput
              className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
              placeholder="Certificate or Award"
              type="text"
              name="name"
              value={field.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCertificateFieldsChange(e, index)}
            />
            <TextInput
              className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
              placeholder="Certificate From (e.g: Google)"
              type="text"
              name="from"
              value={field.from}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCertificateFieldsChange(e, index)}
            />
          </div>
          <div className="relative flex flex-col">
            <Dropdown
              text={`${field.year}`}
              maxHeight="300"
              mainClassNames="absolute bg-white z-10"
              values={yearsList(30)}
              onClick={(item: string) => {
                const data = [...certificatesFields]
                data[index]['year'] = item
                setCertificatesFields(data)
              }}
            />

            <div className="mb-10 mt-16">
              {certificatesFields.length > 1 && (
                <Button
                  className="md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8"
                  label="Delete"
                  onClick={() => removeCertificateFields(index)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
