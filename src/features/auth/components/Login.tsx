import classNames from 'classnames'
import { useState } from 'react'
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'
import { useAuthSchema } from 'src/hooks/useAuthSchema'
import { ISignInPayload } from 'src/interfaces/auth.interface'
import { IModalBgProps } from 'src/interfaces/modal.interface'
import { loginUserSchema } from 'src/schemes/auth.scheme'
import { useSignInMutation } from 'src/services/auth.service'
import Alert from 'src/shared/alert/Alert'
import Button from 'src/shared/button/Button'
import { updateCategoryContainer } from 'src/shared/header/reducers/category.reducer'
import { updateHeader } from 'src/shared/header/reducers/header.reducer'
import TextInput from 'src/shared/inputs/TextInput'
import ModalBg from 'src/shared/modals/ModalBg'
import { saveToSessionStorage } from 'src/shared/utils/utils.service'
import { useAppDispatch } from 'src/store/store'

import { addAuthUser } from '../reducers/auth.reducer'
import { updateLogout } from '../reducers/logout.reducer'

export default function LoginModal({ onClose, onToggle, onTogglePassword }: IModalBgProps) {
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [passwordType, setPasswordType] = useState<string>('password')
  const [userInfo, setUserInfo] = useState<ISignInPayload>({
    username: '',
    password: '',
    browserName: '',
    deviceType: ''
  })

  const dispatch = useAppDispatch()

  const { schemaValidation, validationErrors } = useAuthSchema({ schema: loginUserSchema, userInfo })
  const [signIn, { isLoading }] = useSignInMutation()

  const onLoginUser = async () => {
    try {
      const isValid = await schemaValidation()
      if (isValid) {
        const result = await signIn(userInfo).unwrap()
        setAlertMessage('')

        dispatch(addAuthUser({ authInfo: result.user }))
        dispatch(updateLogout(false))
        dispatch(updateHeader('home'))
        dispatch(updateCategoryContainer(true))

        saveToSessionStorage(JSON.stringify(true), JSON.stringify(result.user?.username))
      }
    } catch (error) {
      console.log(error)
      setAlertMessage(error?.data.message)
    }
  }

  return (
    <ModalBg>
      <div className="relative top-[20%] mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
        <div className="relative px-5 py-5">
          <div className="mb-5 flex justify-between text-2xl font-bold text-gray-600">
            <h1 className="flex w-full justify-center">Sign In to Jobber</h1>
            <Button
              testId="closeModal"
              className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
              role="button"
              label={<FaTimes />}
              onClick={onClose}
            />
          </div>

          {alertMessage && <Alert type="error" message={alertMessage} />}

          <div>
            <label htmlFor="email or username" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
              Email or username
            </label>
            <TextInput
              id="email or username"
              name="username"
              type="text"
              value={userInfo.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInfo((userInfo) => ({ ...userInfo, username: e.target.value }))}
              className={classNames(
                'mt-2 flex h-10 w-full items-center rounded border pl-3 text-sm font-normal text-gray-600 focus:border focus:outline-none',
                {
                  'border-gray-300 focus:border-sky-500/50': !validationErrors.username,
                  'border-red-600 bg-red-50 focus:border-red-600': validationErrors.username
                }
              )}
              classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
              errorMessage={validationErrors.username}
              placeholder="Enter username"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
              Password
            </label>
            <div className="relative mb-2 mt-2">
              {passwordType === 'password' ? (
                <div
                  onClick={() => setPasswordType('text')}
                  className="absolute right-0 top-3.5 flex cursor-pointer items-center pr-3 text-gray-600"
                >
                  <FaEyeSlash />
                </div>
              ) : (
                <div
                  onClick={() => setPasswordType('password')}
                  className="absolute right-0 top-3.5 flex cursor-pointer items-center pr-3 text-gray-600"
                >
                  <FaEye />
                </div>
              )}
              <TextInput
                id="password"
                name="password"
                type={passwordType}
                value={userInfo.password}
                placeholder="Enter password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo((userInfo) => ({ ...userInfo, password: e.target.value }))
                }
                className={classNames(
                  'flex h-10 w-full items-center rounded border pl-3 text-sm font-normal text-gray-600 focus:border focus:outline-none',
                  {
                    'border-gray-300 focus:border-sky-500/50': !validationErrors.password,
                    'border-red-600 bg-red-50 focus:border-red-600': validationErrors.password
                  }
                )}
                classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
                errorMessage={validationErrors.password}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div
              onClick={() => {
                onTogglePassword && onTogglePassword(true)
              }}
              className="mb-6 ml-2 cursor-pointer text-sm text-blue-600 hover:underline dark:text-blue-500"
            >
              Forgot Password?
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <Button
              onClick={onLoginUser}
              testId="submit"
              disabled={false}
              className="text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none"
              label={isLoading ? 'LOGIN IN PROCESS...' : 'LOGIN'}
            />
          </div>
        </div>
        <hr />
        <div className="px-5 py-4">
          <div className="ml-2 flex w-full justify-center text-sm font-medium">
            <div className="flex justify-center">
              Not yet a member?{' '}
              <p
                onClick={() => {
                  onToggle && onToggle(true)
                }}
                className="ml-2 flex cursor-pointer text-blue-600 hover:underline"
              >
                Join Now
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalBg>
  )
}
