import classNames from 'classnames'
import { FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuthSchema } from 'src/hooks/useAuthSchema'
import { AUTH_FETCH_STATUS, IResetPassword } from 'src/interfaces/auth.interface'
import { resetPasswordSchema } from 'src/schemes/auth.scheme'
import { useResetPasswordMutation } from 'src/services/auth.service'
import Alert from 'src/shared/alert/Alert'
import Button from 'src/shared/button/Button'
import Header from 'src/shared/header/Header'
import TextInput from 'src/shared/inputs/TextInput'

export default function ResetPassword() {
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [userInfo, setUserInfo] = useState<IResetPassword>({
    password: '',
    confirmPassword: ''
  })
  const [status, setStatus] = useState<string>(AUTH_FETCH_STATUS.IDLE)
  const { schemaValidation, validationErrors } = useAuthSchema({ schema: resetPasswordSchema, userInfo })
  const [searchParams] = useSearchParams({})
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const onResetPassword = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    try {
      const isValid = await schemaValidation()
      if (isValid) {
        const result = await resetPassword({
          password: userInfo.password,
          confirmPassword: userInfo.confirmPassword,
          token: `${searchParams.get('token')}`
        }).unwrap()

        setAlertMessage(`${result.message}`)
        setStatus(AUTH_FETCH_STATUS.SUCCESS)
        setUserInfo({ password: '', confirmPassword: '' })
      }
    } catch (error) {
      console.log(error)
      setStatus(AUTH_FETCH_STATUS.ERROR)
      setAlertMessage(error?.data.message)
    }
  }

  return (
    <div className="dark flex flex-col">
      <Header navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
      <div className="relative mx-auto mt-24 w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
        <div className="relative px-5 py-5">
          <h2 className="mb-2 text-center text-xl font-bold leading-tight tracking-tight dark:text-black md:text-2xl">Reset Password</h2>
          {alertMessage && <Alert type={status} message={alertMessage} />}
          <form className="mt-4 space-y-1 md:space-y-2 lg:mt-5" onSubmit={onResetPassword}>
            <div>
              <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Password
              </label>
              <TextInput
                id="password"
                name="password"
                type="password"
                value={userInfo.password}
                className={classNames(
                  'flex h-10 w-full items-center rounded border pl-3 text-sm font-normal text-gray-600 focus:border focus:outline-none',
                  {
                    'border-gray-300 focus:border-sky-500/50': !validationErrors.password,
                    'border-red-600 bg-red-50 focus:border-red-600': validationErrors.password
                  }
                )}
                classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
                errorMessage={validationErrors.password}
                placeholder="Enter password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUserInfo({ ...userInfo, password: event.target.value })
                }}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Confirm Password
              </label>
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={userInfo.confirmPassword}
                className={classNames(
                  'flex h-10 w-full items-center rounded border pl-3 text-sm font-normal text-gray-600 focus:border focus:outline-none',
                  {
                    'border-gray-300 focus:border-sky-500/50': !validationErrors.confirmPassword,
                    'border-red-600 bg-red-50 focus:border-red-600': validationErrors.confirmPassword
                  }
                )}
                classNameError="mt-1 min-h-[1rem] text-xs text-red-600"
                errorMessage={validationErrors.confirmPassword}
                placeholder="Enter confirm password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUserInfo({ ...userInfo, confirmPassword: event.target.value })
                }}
              />
            </div>
            <Button
              disabled={!userInfo.password || !userInfo.confirmPassword}
              className={`text-md block w-full rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none ${
                !userInfo.password || !userInfo.confirmPassword ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              label={`${isLoading ? 'RESET PASSWORD IN PROGRESS...' : 'RESET PASSWORD'}`}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
