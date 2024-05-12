import './CheckoutForm.scss'

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Stripe, StripeElement, StripeElements } from '@stripe/stripe-js'
import { FormEvent, useEffect, useState } from 'react'
import { createSearchParams } from 'react-router-dom'
import { IOffer } from 'src/interfaces/order.interface'
import Button from 'src/shared/button/Button'

import CheckoutFormSkeleton from './CheckoutFormSkeleton'

interface ICheckoutProps {
  gigId: string
  offer: IOffer
}

const CLIENT_ENDPOINT = import.meta.env.VITE_CLIENT_ENDPOINT

export default function CheckoutForm({ gigId, offer }: ICheckoutProps) {
  const [isStripeLoading, setIsStripeLoading] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const stripe: Stripe | null = useStripe()
  const elements: StripeElements | null = useElements()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setIsLoading(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${CLIENT_ENDPOINT}/gig/order/requirement/${gigId}?${createSearchParams({
          offer: JSON.stringify(offer),
          order_date: `${new Date()}`
        })}`
      }
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(`${error.message}`)
    } else {
      setMessage('An unexpected error occurred')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (elements) {
      const element = elements.getElement(PaymentElement) as StripeElement
      if (element) {
        setIsStripeLoading(false)
      }
    }
  }, [elements])

  useEffect(() => {
    if (!stripe) {
      return
    }
    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret: string = new URLSearchParams(window.location.search).get('payment_intent_client_secret') as string
    if (!clientSecret) {
      return
    }
    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!')
          break
        case 'processing':
          setMessage('Your payment is processing')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again')
          break
        default:
          setMessage('Something went wrong')
          break
      }
    })
  }, [stripe])

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {isStripeLoading && <CheckoutFormSkeleton />}
      <PaymentElement id="payment-element" onReady={() => setIsStripeLoading(false)} />
      <Button
        id="submit"
        className={`w-full rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base ${
          isLoading || !stripe || !elements ? 'cursor-not-allowed bg-sky-200' : 'bg-sky-500 hover:bg-sky-400'
        }`}
        disabled={!stripe}
        label={<span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Confirm & Pay'}</span>}
      />
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
