import classNames from 'classnames'
import { useRef, useState } from 'react'
import equal from 'react-fast-compare'
import { FaCamera } from 'react-icons/fa'
import ReactQuill, { UnprivilegedEditor } from 'react-quill'
import { useNavigate, useParams } from 'react-router-dom'
import { addSeller } from 'src/features/seller/reducers/seller.reducer'
import { useGigSchema } from 'src/hooks/useGigSchema'
import { GIG_MAX_LENGTH, IAllowedGigItem, ICreateGig, IShowGigModal } from 'src/interfaces/gig.interface'
import { IApprovalModalContent } from 'src/interfaces/modal.interface'
import { ISellerDocument } from 'src/interfaces/seller.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { IResponse } from 'src/interfaces/utils.interface'
import { gigInfoSchema } from 'src/schemes/gig.scheme'
import { useCreateGigMutation } from 'src/services/gig.service'
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb'
import Button from 'src/shared/button/Button'
import Dropdown from 'src/shared/dropdown/Dropdown'
import TextAreaInput from 'src/shared/inputs/TextAreaInput'
import TextInput from 'src/shared/inputs/TextInput'
import ApprovalModal from 'src/shared/modals/ApprovalModal'
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader'
import { checkImage, readAsBase64 } from 'src/shared/utils/image-utils.service'
import {
  categories,
  expectedGigDelivery,
  lowerCase,
  reactQuillUtils,
  replaceSpacesWithDash,
  showErrorToast
} from 'src/shared/utils/utils.service'
import { useAppDispatch, useAppSelector } from 'src/store/store'

import TagsInput from './components/TagsInput'
import { updateHeader } from 'src/shared/header/reducers/header.reducer'

const defaultGigInfo: ICreateGig = {
  title: '',
  categories: 'Select a category',
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
  const seller = useAppSelector((state: IReduxState) => state.seller)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { sellerId } = useParams()

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
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>()

  const reactQuillRef = useRef<ReactQuill | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const gigInfoRef = useRef<ICreateGig>(defaultGigInfo)

  const { schemaValidation, validationErrors } = useGigSchema({ schema: gigInfoSchema, gigInfo })

  const [createGig, { isLoading }] = useCreateGigMutation()

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

  const onCreateGig = async () => {
    try {
      const isValid: boolean = await schemaValidation()

      if (isValid) {
        const gig: ICreateGig = {
          profilePicture: `${authUser.profilePicture}`,
          sellerId,
          title: gigInfo.title,
          categories: gigInfo.categories,
          description: gigInfo.description,
          subCategories,
          tags,
          price: gigInfo.price,
          coverImage: gigInfo.coverImage,
          expectedDelivery: gigInfo.expectedDelivery,
          basicTitle: gigInfo.basicTitle,
          basicDescription: gigInfo.basicDescription
        }

        const response: IResponse = await createGig(gig).unwrap()
        const updatedSeller: ISellerDocument = { ...seller, totalGigs: (seller.totalGigs as number) + 1 }
        dispatch(addSeller(updatedSeller))
        dispatch(updateHeader('home'))
        const title = replaceSpacesWithDash(gig.title)
        navigate(`/gig/${lowerCase(`${authUser.username}`)}/${title}/${response?.gig?.sellerId}/${response?.gig?.id}/view`)
      }
    } catch (error) {
      showErrorToast('Error creating gig')
    }
  }

  const onCancelCreate = () => {
    navigate(`/seller_profile/${lowerCase(`${authUser.username}/${sellerId}/edit`)}`)
  }

  return (
    <>
      {showGigModal.cancel && (
        <ApprovalModal
          approvalModalContent={approvalModalContent}
          onClose={() => setShowGigModal({ ...showGigModal, cancel: false })}
          onClick={onCancelCreate}
        />
      )}
      <div className="relative w-screen">
        <Breadcrumb breadCrumbItems={['Seller', 'Create new gig']} />
        <div className="container relative mx-auto my-5 px-2 pb-12">
          {isLoading && <CircularPageLoader />}
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
                  className={classNames('mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
                    'border-grey focus:outline-none': !validationErrors.title,
                    'border-red-600 bg-red-50 focus:border-red-600': validationErrors.title
                  })}
                  classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
                  errorMessage={validationErrors.title}
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
                  className={classNames('mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
                    'border-grey focus:outline-none': !validationErrors.basicTitle,
                    'border-red-600 bg-red-50 focus:border-red-600': validationErrors.basicTitle
                  })}
                  classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
                  errorMessage={validationErrors.basicTitle}
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
                  className={classNames('mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
                    'border-grey focus:outline-none': !validationErrors.basicDescription,
                    'border-red-600 bg-red-50 focus:border-red-600': validationErrors.basicDescription
                  })}
                  classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
                  errorMessage={validationErrors.basicDescription}
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
                <div className="flex text-xs text-[#95979d]">
                  {validationErrors.description && <div className="min-h-[1rem] text-xs text-red-600">{validationErrors.description}</div>}
                  <span className="ml-auto">{allowedGigItemLength.descriptionCharacters} Characters</span>
                </div>
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
                  mainClassNames={classNames('absolute border', {
                    'border-red-600 bg-red-50 focus:border-red-600': validationErrors.categories,
                    'bg-white border-grey focus:outline-none': !validationErrors.categories
                  })}
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
              className={classNames('mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none', {
                'border-grey focus:outline-none': !validationErrors.subCategories,
                'border-red-600 bg-red-50 focus:border-red-600': validationErrors.subCategories
              })}
              classNameError=" min-h-[1rem] text-xs text-red-600"
              errorMessage={validationErrors.subCategories as any}
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
              className={classNames('mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none', {
                'border-grey focus:outline-none': !validationErrors.tags,
                'border-red-600 bg-red-50 focus:border-red-600': validationErrors.tags
              })}
              classNameError=" min-h-[1rem] text-xs text-red-600"
              errorMessage={validationErrors.tags as any}
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
                  className={classNames('mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600', {
                    'border-grey focus:outline-none': !validationErrors.price,
                    'border-red-600 bg-red-50 focus:border-red-600': validationErrors.price
                  })}
                  classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
                  errorMessage={validationErrors.price as any}
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
                  mainClassNames={classNames('absolute border z-40', {
                    'border-red-600 bg-red-50 focus:border-red-600': validationErrors.expectedDelivery,
                    'bg-white border-grey focus:outline-none': !validationErrors.expectedDelivery
                  })}
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

                {!gigInfo.coverImage && (
                  <div className="left-0 top-0 flex h-[220px] w-full cursor-pointer justify-center bg-[#dee1e7]"></div>
                )}

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
                  classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
                  errorMessage={validationErrors.coverImage}
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
                  disabled={isLoading}
                  className="rounded bg-sky-500 px-8 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-3 md:text-base"
                  label="Create Gig"
                  onClick={onCreateGig}
                />
                <Button
                  disabled={isLoading}
                  className="rounded bg-red-500 px-8 py-3 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:py-3 md:text-base"
                  label="Cancel"
                  onClick={() => {
                    const isEqual: boolean = equal(gigInfo, gigInfoRef.current)
                    if (!isEqual) {
                      setApprovalModalContent({
                        header: 'Cancel Gig Creation',
                        body: 'Are you sure you want to cancel?',
                        btnText: 'Yes, Cancel',
                        btnColor: 'bg-red-500 hover:bg-red-400'
                      })
                      setShowGigModal({ ...showGigModal, cancel: true })
                    } else {
                      onCancelCreate()
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
