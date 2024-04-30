import { useRef, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import ReactQuill, { UnprivilegedEditor } from 'react-quill'
import { GIG_MAX_LENGTH, IAllowedGigItem, ICreateGig, IShowGigModal } from 'src/interfaces/gig.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb'
import Button from 'src/shared/button/Button'
import Dropdown from 'src/shared/dropdown/Dropdown'
import TextAreaInput from 'src/shared/inputs/TextAreaInput'
import TextInput from 'src/shared/inputs/TextInput'
import { checkImage, readAsBase64 } from 'src/shared/utils/image-utils.service'
import { categories, expectedGigDelivery, reactQuillUtils } from 'src/shared/utils/utils.service'
import { useAppSelector } from 'src/store/store'

import TagsInput from './components/TagsInput'

const defaultGigInfo: ICreateGig = {
  title: '',
  categories: '',
  description: '',
  subCategories: [],
  tags: [],
  price: 0,
  coverImage: 'https://placehold.co/330x220?text=Cover+Image',
  expectedDelivery: 'Expected delivery',
  basicTitle: '',
  basicDescription: ''
}

export default function AddGig() {
  const authUser = useAppSelector((state: IReduxState) => state.authUser)

  const [gigInfo, setGigInfo] = useState<ICreateGig>(defaultGigInfo)
  const [allowedGigItemLength, setAllowedGigItemLength] = useState<IAllowedGigItem>({
    gigTitle: '80/80',
    basicTitle: '40/40',
    basicDescription: '100/100',
    descriptionCharacters: '1200/1200'
  })
  const [subCategories, setSubCategories] = useState<string[]>([])
  const [subCategoryInput, setSubCategoryInput] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [tagsInput, setTagsInput] = useState<string>('')
  const [showGigModal, setShowGigModal] = useState<IShowGigModal>({
    image: false,
    cancel: false
  })

  const reactQuillRef = useRef<ReactQuill | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    if (target.files) {
      const file: File = target.files[0]
      const isValid = checkImage(file, 'image')
      if (isValid) {
        const dataImage: string | ArrayBuffer | null = await readAsBase64(file)
        setGigInfo({ ...gigInfo, coverImage: `${dataImage}` })
      }
      setShowGigModal({ ...showGigModal, image: false })
    }
  }

  console.log(gigInfo)
  return (
    <div className="relative w-screen">
      <Breadcrumb breadCrumbItems={['Seller', 'Create new gig']} />
      <div className="container relative mx-auto my-5 px-2 pb-12">
        {/* <!-- CircularPageLoader --> */}
        {!authUser.emailVerified && (
          <div className="absolute left-0 top-0 z-[80] flex h-full w-full justify-center bg-white/[0.8] text-sm font-bold md:text-base lg:text-xl">
            <span className="mt-40">Please verify your email</span>
          </div>
        )}

        <div className="border-grey left-0 top-0 z-10 mt-4 block rounded border bg-white p-6">
          <div className="mb-6 grid md:grid-cols-5">
            <div className="pb-2 text-base font-medium">
              Gig title<sup className="top-[-0.3em] text-base text-red-500">*</sup>
            </div>
            <div className="col-span-4 md:w-11/12 lg:w-8/12">
              <TextInput
                className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                type="text"
                name="gigTitle"
                value={gigInfo.title}
                onChange={(e) => {
                  const title = e.target.value
                  const counter = GIG_MAX_LENGTH.gigTitle - title.length
                  setGigInfo({ ...gigInfo, title })
                  setAllowedGigItemLength({ ...allowedGigItemLength, gigTitle: `${counter}/80` })
                }}
                placeholder="I will build something I'm good at"
                maxLength={80}
              />
              <span className="flex justify-end text-xs text-[#95979d]">{allowedGigItemLength.gigTitle} Characters</span>
            </div>
          </div>
          <div className="mb-6 grid md:grid-cols-5">
            <div className="pb-2 text-base font-medium">
              Basic title<sup className="top-[-0.3em] text-base text-red-500">*</sup>
            </div>
            <div className="col-span-4 md:w-11/12 lg:w-8/12">
              <TextInput
                className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                placeholder="Write what exactly you'll do in short"
                type="text"
                name="basicTitle"
                value={gigInfo.basicTitle}
                onChange={(e) => {
                  const basicTitle = e.target.value
                  const counter = GIG_MAX_LENGTH.basicTitle - basicTitle.length
                  setGigInfo({ ...gigInfo, basicTitle })
                  setAllowedGigItemLength({ ...allowedGigItemLength, basicTitle: `${counter}/40` })
                }}
                maxLength={40}
              />
              <span className="flex justify-end text-xs text-[#95979d]">{allowedGigItemLength.basicTitle} Characters</span>
            </div>
          </div>
          <div className="mb-6 grid md:grid-cols-5">
            <div className="pb-2 text-base font-medium">
              Brief description<sup className="top-[-0.3em] text-base text-red-500">*</sup>
            </div>
            <div className="col-span-4 md:w-11/12 lg:w-8/12">
              <TextAreaInput
                className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                placeholder="Write a brief description..."
                name="basicDescription"
                value={gigInfo.basicDescription}
                onChange={(e) => {
                  const basicDescription = e.target.value
                  const counter = GIG_MAX_LENGTH.basicDescription - basicDescription.length
                  setGigInfo({ ...gigInfo, basicDescription })
                  setAllowedGigItemLength({ ...allowedGigItemLength, basicDescription: `${counter}/100` })
                }}
                rows={5}
                maxLength={100}
              />
              <span className="flex justify-end text-xs text-[#95979d]">{allowedGigItemLength.basicDescription} Characters</span>
            </div>
          </div>
          <div className="mb-6 grid md:grid-cols-5">
            <div className="pb-2 text-base font-medium">
              Full description<sup className="top-[-0.3em] text-base text-red-500">*</sup>
            </div>
            <div className="col-span-4 md:w-11/12 lg:w-8/12">
              <ReactQuill
                theme="snow"
                value={gigInfo.description}
                className="border-grey rounded border"
                modules={reactQuillUtils().modules}
                formats={reactQuillUtils().formats}
                ref={(element: ReactQuill | null) => {
                  reactQuillRef.current = element
                  const reactQuillEditor = reactQuillRef.current?.getEditor()
                  reactQuillEditor?.on('text-change', () => {
                    if (reactQuillEditor.getLength() > GIG_MAX_LENGTH.fullDescription) {
                      reactQuillEditor.deleteText(GIG_MAX_LENGTH.fullDescription, reactQuillEditor.getLength())
                    }
                  })
                }}
                onChange={(value: string, _, __, editor: UnprivilegedEditor) => {
                  setGigInfo({ ...gigInfo, description: value })
                  const counter: number = GIG_MAX_LENGTH.fullDescription - editor.getLength()
                  setAllowedGigItemLength({ ...allowedGigItemLength, descriptionCharacters: `${counter}/1200` })
                }}
              />
              <span className="flex justify-end text-xs text-[#95979d]">{allowedGigItemLength.descriptionCharacters} Characters</span>
            </div>
          </div>
          <div className="mb-12 grid md:grid-cols-5">
            <div className="pb-2 text-base font-medium">
              Category<sup className="top-[-0.3em] text-base text-red-500">*</sup>
            </div>
            <div className="relative col-span-4 md:w-11/12 lg:w-8/12">
              <Dropdown
                text={gigInfo.categories}
                maxHeight="300"
                mainClassNames="absolute bg-white"
                values={categories()}
                onClick={(item) => {
                  setGigInfo({ ...gigInfo, categories: item })
                }}
              />
            </div>
          </div>

          <TagsInput
            title="SubCategory"
            placeholder="E.g. Website development, Mobile apps"
            gigInfo={gigInfo}
            setGigInfo={setGigInfo}
            tags={subCategories}
            itemInput={subCategoryInput}
            itemName="subCategories"
            counterText="SubCategories"
            inputErrorMessage={false}
            setItems={setSubCategories}
            setItemInput={setSubCategoryInput}
          />

          <TagsInput
            title="Tags"
            placeholder="Enter search terms for your gig"
            gigInfo={gigInfo}
            setGigInfo={setGigInfo}
            tags={tags}
            itemInput={tagsInput}
            itemName="tags"
            counterText="Tags"
            inputErrorMessage={false}
            setItems={setTags}
            setItemInput={setTagsInput}
          />

          <div className="mb-6 grid md:grid-cols-5">
            <div className="pb-2 text-base font-medium">
              Price<sup className="top-[-0.3em] text-base text-red-500">*</sup>
            </div>
            <div className="col-span-4 md:w-11/12 lg:w-8/12">
              <TextInput
                type="number"
                className="border-grey mb-1 w-full rounded border p-3.5 text-sm font-normal text-gray-600 focus:outline-none"
                placeholder="Enter minimum price"
                name="price"
                value={gigInfo.price}
                onChange={(e) => setGigInfo({ ...gigInfo, price: parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 })}
              />
            </div>
          </div>
          <div className="mb-12 grid md:grid-cols-5">
            <div className="pb-2 text-base font-medium">
              Expected delivery<sup className="top-[-0.3em] text-base text-red-500">*</sup>
            </div>
            <div className="relative col-span-4 md:w-11/12 lg:w-8/12">
              <Dropdown
                text={gigInfo.expectedDelivery}
                maxHeight="300"
                mainClassNames="absolute bg-white z-40"
                values={expectedGigDelivery()}
                onClick={(item) => {
                  setGigInfo({ ...gigInfo, expectedDelivery: item })
                }}
              />
            </div>
          </div>
          <div className="mb-6 grid md:grid-cols-5">
            <div className="mt-6 pb-2 text-base font-medium lg:mt-0">
              Cover image<sup className="top-[-0.3em] text-base text-red-500">*</sup>
            </div>
            <div
              className="relative w-full cursor-pointer md:col-span-2 lg:w-[320px]"
              onMouseEnter={() => setShowGigModal({ ...showGigModal, image: true })}
              onMouseLeave={() => setShowGigModal({ ...showGigModal, image: false })}
            >
              {gigInfo.coverImage && (
                <img src={gigInfo.coverImage} alt="Cover Image" className="left-0 top-0 h-[220px] w-full bg-white object-cover" />
              )}

              {!gigInfo.coverImage && <div className="left-0 top-0 flex h-[220px] w-full cursor-pointer justify-center bg-[#dee1e7]"></div>}

              {showGigModal.image && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute left-0 top-0 flex h-[220px] w-full cursor-pointer justify-center bg-[#dee1e7]"
                >
                  <FaCamera className="flex self-center" />
                </div>
              )}

              <TextInput
                name="image"
                type="file"
                ref={fileInputRef}
                className="mt-4 hidden"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="xs:grid-cols-1 grid md:grid-cols-5">
            <div className="pb-2 text-base font-medium lg:mt-0"></div>
            <div className="col-span-4 flex gap-x-4 md:w-11/12 lg:w-8/12">
              <Button
                disabled={false}
                className="rounded bg-sky-500 px-8 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-3 md:text-base"
                label="Create Gig"
              />
              <Button
                disabled={false}
                className="rounded bg-red-500 px-8 py-3 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:py-3 md:text-base"
                label="Cancel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
