import classNames from 'classnames'
import { useRef, useState } from 'react'
import { FaCamera, FaChevronLeft, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'
import { ISignUpPayload } from 'src/interfaces/auth.interface'
import { IModalBgProps } from 'src/interfaces/modal.interface'
import Alert from 'src/shared/alert/Alert'
import Button from 'src/shared/button/Button'
import Dropdown from 'src/shared/dropdown/Dropdown'
import TextInput from 'src/shared/inputs/TextInput'
import ModalBg from 'src/shared/modals/ModalBg'
import { countriesList } from 'src/shared/utils/utils.service'
import { checkImage, readAsBase64 } from 'src/shared/utils/image-utils.service'
import { useAuthSchema } from 'src/hooks/useAuthSchema'
import { registerUserSchema } from 'src/schemes/auth.scheme'
import { useSignUpMutation } from 'src/services/auth.service'

export default function RegisterModal({ onClose, onToggle }: IModalBgProps) {
  const [step, setStep] = useState<number>(1)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [passwordType, setPasswordType] = useState<string>('password')
  const [country, setCountry] = useState<string>('Select Country')
  const [profileImage, setProfileImage] = useState<string>('https://placehold.co/330x220?text=Profile+Image')
  const [showImageSelect, setShowImageSelect] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<ISignUpPayload>({
    username: '',
    email: '',
    country: '',
    password: '',
    profilePicture: '',
    browserName: '',
    deviceType: ''
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const { schemaValidation, validationErrors } = useAuthSchema({ schema: registerUserSchema, userInfo })
  const [signUp, { isLoading }] = useSignUpMutation()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    if (target.files) {
      const file: File = target.files[0]
      const isValid = checkImage(file, 'image')
      if (isValid) {
        const dataImage: string | ArrayBuffer | null = await readAsBase64(file)
        setProfileImage(`${dataImage}`)
        setUserInfo({ ...userInfo, profilePicture: `${dataImage}` })
      }
      setShowImageSelect(false)
    }
  }

  const onRegisterUser = async () => {
    try {
      const isValid = await schemaValidation()
      if (isValid) {
        const result = await signUp(userInfo).unwrap()
        console.log(result)
        setAlertMessage('')
      }
    } catch (error) {
      console.log(error)
      setAlertMessage(error?.data.message)
    }
  }

  return (
    <ModalBg>
      <div className="relative top-[8%] mx-auto w-11/12 max-w-md rounded bg-white md:w-2/3">
        <div className="relative px-5 py-5">
          <div className="flex justify-between text-2xl font-bold text-gray-600">
            {step > 1 && (
              <Button
                onClick={() => setStep((step) => step - 1)}
                className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
                role="button"
                label={<FaChevronLeft />}
              />
            )}

            <h1 className="flex w-full justify-center">Join Jobber</h1>
            <Button
              className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
              role="button"
              label={<FaTimes />}
              onClick={onClose}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center px-5 py-5">
          <ol className="flex w-full">
            <li
              className={classNames(
                "flex w-full items-center text-white after:inline-block after:h-1 after:w-full after:border-4 after:border-b  after:content-[''] ",
                {
                  'after:border-sky-300/50 dark:after:border-sky-300/50': step !== 2,
                  'after:border-sky-500 dark:after:border-sky-500': step === 2
                }
              )}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 font-bold dark:bg-sky-500 lg:h-12 lg:w-12">
                1
              </span>
            </li>
            <li className="flex items-center">
              <span
                className={classNames(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white lg:h-12 lg:w-12',
                  {
                    'bg-sky-500 dark:bg-sky-500': step === 2,
                    'bg-sky-300/50 dark:bg-sky-300/50': step !== 2
                  }
                )}
              >
                2
              </span>
            </li>
          </ol>
        </div>

        <div className="px-5">{alertMessage && <Alert type="error" message={alertMessage} />}</div>

        {step === 1 && (
          <div className="relative px-5 py-5">
            <div>
              <label htmlFor="username" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Username
              </label>
              <TextInput
                id="username"
                name="username"
                type="text"
                value={userInfo.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo((userInfo) => ({ ...userInfo, username: e.target.value }))
                }
                className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Email
              </label>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={userInfo.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInfo((userInfo) => ({ ...userInfo, email: e.target.value }))}
                className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Password
              </label>
              <div className="relative mb-5 mt-2">
                {passwordType === 'password' ? (
                  <div
                    onClick={() => setPasswordType('text')}
                    className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600"
                  >
                    <FaEyeSlash />
                  </div>
                ) : (
                  <div
                    onClick={() => setPasswordType('password')}
                    className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600"
                  >
                    <FaEye />
                  </div>
                )}

                <TextInput
                  id="password"
                  name="password"
                  type={passwordType}
                  value={userInfo.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserInfo((userInfo) => ({ ...userInfo, password: e.target.value }))
                  }
                  className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <Button
              disabled={!userInfo.username || !userInfo.email || !userInfo.password}
              onClick={() => setStep(2)}
              className={`${!userInfo.username || !userInfo.email || !userInfo.password ? 'cursor-not-allowed' : 'cursor-pointer'} text-md  block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none`}
              label="Continue"
            />
          </div>
        )}

        {step === 2 && (
          <div className="relative px-5 py-5">
            <div className="h-24">
              <label htmlFor="country" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Country
              </label>
              <div id="country" className="relative mb-5 mt-2">
                <Dropdown
                  text={country}
                  maxHeight="200"
                  mainClassNames="absolute bg-white z-50"
                  showSearchInput={true}
                  values={countriesList()}
                  setValue={setCountry}
                  onClick={(item: string) => {
                    setCountry(item)
                    setUserInfo((userInfo) => ({ ...userInfo, country: item }))
                  }}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="profilePicture" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Profile Picture
              </label>
              <div
                onMouseEnter={() => setShowImageSelect(true)}
                onMouseLeave={() => setShowImageSelect(false)}
                className="relative mb-5 mt-2 w-[20%] cursor-pointer"
              >
                {profileImage && (
                  <img
                    id="profilePicture"
                    src={profileImage}
                    alt="Profile Picture"
                    className="left-0 top-0 h-20 w-20 rounded-full bg-white object-cover"
                  />
                )}

                {!profileImage && (
                  <div className="left-0 top-0 flex h-20 w-20 cursor-pointer justify-center rounded-full bg-[#dee1e7]"></div>
                )}

                {showImageSelect && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute left-0 top-0 flex h-20 w-20 cursor-pointer justify-center rounded-full bg-[#dee1e7]"
                  >
                    <FaCamera className="flex self-center" />
                  </div>
                )}

                <TextInput
                  name="image"
                  ref={fileInputRef}
                  type="file"
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
            <Button
              onClick={onRegisterUser}
              disabled={!userInfo.profilePicture || !userInfo.country}
              className={`${!userInfo.profilePicture || !userInfo.country ? 'cursor-not-allowed' : 'cursor-pointer'} text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none`}
              label={`${isLoading} ? "SIGNUP IN PROCESS..." : "SIGNUP"`}
            />
          </div>
        )}

        <hr />
        <div className="px-5 py-4">
          <div className="ml-2 flex w-full justify-center text-sm font-medium">
            <div
              onClick={() => {
                onToggle && onToggle(true)
              }}
              className="flex justify-center"
            >
              Already a member? <p className="ml-2 flex cursor-pointer text-blue-600 hover:underline">Sign In</p>
            </div>
          </div>
        </div>
      </div>
    </ModalBg>
  )
}
