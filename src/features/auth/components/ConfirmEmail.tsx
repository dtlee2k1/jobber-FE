import { useCallback, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AUTH_FETCH_STATUS } from 'src/interfaces/auth.interface'
import { useVerifyEmailMutation } from 'src/services/auth.service'
import Alert from 'src/shared/alert/Alert'
import { useAppDispatch } from 'src/store/store'

import { addAuthUser } from '../reducer/auth.reducer'

export default function ConfirmEmail() {
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [status, setStatus] = useState<string>(AUTH_FETCH_STATUS.IDLE)
  const [searchParams] = useSearchParams({})
  const dispatch = useAppDispatch()
  const [verifyEmail] = useVerifyEmailMutation()

  const onVerifyEmail = useCallback(async () => {
    try {
      const result = await verifyEmail(`${searchParams.get('v_token')}`).unwrap()
      setAlertMessage('Email verified successfully')
      setStatus(AUTH_FETCH_STATUS.SUCCESS)
      dispatch(addAuthUser({ authInfo: result.user }))
    } catch (error) {
      setStatus(AUTH_FETCH_STATUS.ERROR)
      setAlertMessage(error?.data.message)
    }
  }, [dispatch, searchParams, verifyEmail])

  useEffect(() => {
    onVerifyEmail()
  }, [onVerifyEmail])

  return (
    <div className="container mx-auto mt-20 flex flex-col items-center justify-center px-6 py-8 lg:py-0">
      <div className="w-[30%]">
        <Alert type={status} message={alertMessage} />
      </div>
      <Link
        to="/"
        className="mt-5 rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
      >
        Continue to Home
      </Link>
    </div>
  )
}
