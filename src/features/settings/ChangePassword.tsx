import { useState } from 'react'
import { FaCircleNotch, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useChangePasswordMutation } from 'src/services/auth.service'
import Alert from 'src/shared/alert/Alert'
import Button from 'src/shared/button/Button'
import TextInput from 'src/shared/inputs/TextInput'
import { PASSWORD_TYPE } from 'src/shared/utils/static-data'
import { isFetchBaseQueryError, showSuccessToast } from 'src/shared/utils/utils.service'

interface IPasswordItem {
  currentPassword: string
  newPassword: string
  passwordType: string
}

export default function ChangePassword() {
  const [passwordItem, setPasswordItem] = useState<IPasswordItem>({
    currentPassword: '',
    newPassword: '',
    passwordType: PASSWORD_TYPE.PASSWORD
  })
  const [alertMessage, setAlertMessage] = useState<string>('')

  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const onUpdatePassword = async () => {
    try {
      await changePassword({ currentPassword: passwordItem.currentPassword, newPassword: passwordItem.newPassword }).unwrap()

      showSuccessToast('Password updated successfully')
      setAlertMessage('')
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        setAlertMessage(error?.data?.message)
      }
    }
  }

  return (
    <div>
      {alertMessage && <Alert type="error" message={alertMessage} />}
      <>
        <label htmlFor="currentPassword" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
          Current Password
        </label>
        <TextInput
          id="currentPassword"
          name="currentPassword"
          type={passwordItem.passwordType}
          value={passwordItem.currentPassword}
          className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
          placeholder="Enter current password"
          onChange={(e) => setPasswordItem({ ...passwordItem, currentPassword: e.target.value })}
        />
      </>
      <>
        <label htmlFor="newPassword" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
          New Password
        </label>
        <div className="relative flex gap-4">
          <TextInput
            id="newPassword"
            name="newPassword"
            type={passwordItem.passwordType}
            value={passwordItem.newPassword}
            className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
            placeholder="Enter new password"
            onChange={(e) => setPasswordItem({ ...passwordItem, newPassword: e.target.value })}
          />
          <div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600">
            {passwordItem.passwordType === PASSWORD_TYPE.PASSWORD ? (
              <FaEyeSlash className="mb-2" onClick={() => setPasswordItem({ ...passwordItem, passwordType: PASSWORD_TYPE.TEXT })} />
            ) : (
              <FaEye className="mb-2" onClick={() => setPasswordItem({ ...passwordItem, passwordType: PASSWORD_TYPE.PASSWORD })} />
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <Button
            disabled={!passwordItem.currentPassword || !passwordItem.newPassword}
            className={`text-md block w-full rounded  px-8 py-2 text-center font-bold text-white focus:outline-none ${
              !passwordItem.currentPassword || !passwordItem.newPassword ? 'cursor-not-allowed bg-sky-200' : 'cursor-pointer bg-sky-500'
            }`}
            label={
              isLoading ? (
                <div className="flex items-center justify-center">
                  <FaCircleNotch className="mr-2 h-3.5 w-3.5 animate-spin" color="#fff" />
                  <span>Loading</span>
                </div>
              ) : (
                'Save Changes'
              )
            }
            onClick={onUpdatePassword}
          />
        </div>
      </>
    </div>
  )
}
