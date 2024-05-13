import { PDFDownloadLink } from '@react-pdf/renderer'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { IOffer, IOrderDocument, IOrderInvoice } from 'src/interfaces/order.interface'
import { IReduxState } from 'src/interfaces/store.interface'
import { IResponse } from 'src/interfaces/utils.interface'
import { useGetGigByIdQuery } from 'src/services/gig.service'
import { useCreateOrderMutation } from 'src/services/order.service'
import Button from 'src/shared/button/Button'
import TextAreaInput from 'src/shared/inputs/TextAreaInput'
import { dayMonthYear } from 'src/shared/utils/timeago.utils'
import { deleteFromLocalStorage, generateRandomNumber, getDataFromLocalStorage, showErrorToast } from 'src/shared/utils/utils.service'
import { useAppSelector } from 'src/store/store'

import { OrderContext } from '../context/OrderContext'
import Invoice from './invoice/Invoice'

export default function Requirement() {
  const buyer = useAppSelector((state: IReduxState) => state.buyer)

  const navigate = useNavigate()
  const { gigId } = useParams<string>()
  const [searchParams] = useSearchParams({})
  const order_date = `${searchParams.get('order_date')}`
  const offer: IOffer = JSON.parse(`${searchParams.get('offer')}`)
  const serviceFee = useMemo(() => (offer.price < 50 ? (5.5 / 100) * offer.price + 2 : (5.5 / 100) * offer.price), [offer.price])

  const [orderId, setOrderId] = useState('')
  const [invoiceId, setInvoiceId] = useState('')
  const [requirement, setRequirement] = useState<string>('')
  const gigRef = useRef<ISellerGig>()
  const placeholder = 'https://placehold.co/330x220?text=Placeholder'

  const { data, isSuccess } = useGetGigByIdQuery(`${gigId}`)
  const [createOrder] = useCreateOrderMutation()

  if (isSuccess) {
    gigRef.current = data.gig
  }

  const orderInvoice: IOrderInvoice = {
    invoiceId,
    orderId,
    date: `${new Date()}`,
    buyerUsername: `${buyer.username}`,
    orderService: [
      {
        service: `${gigRef?.current?.title}`,
        quantity: 1,
        price: offer.price
      },
      {
        service: 'Service Fee',
        quantity: 1,
        price: serviceFee
      }
    ]
  }

  const startOrder = async (): Promise<void> => {
    try {
      const paymentIntentId = getDataFromLocalStorage('paymentIntentId')
      const order: IOrderDocument = {
        offer: {
          gigTitle: offer.gigTitle,
          price: offer.price,
          description: offer.description,
          deliveryInDays: offer.deliveryInDays,
          oldDeliveryDate: offer.oldDeliveryDate,
          newDeliveryDate: offer.newDeliveryDate,
          accepted: true,
          cancelled: offer.cancelled
        },
        gigId: `${gigId}`,
        sellerId: `${gigRef?.current?.sellerId}`,
        sellerImage: `${gigRef?.current?.profilePicture}`,
        sellerUsername: `${gigRef?.current?.username}`,
        sellerEmail: `${gigRef?.current?.email}`,
        gigCoverImage: `${gigRef?.current?.coverImage}`,
        gigMainTitle: `${gigRef?.current?.title}`,
        gigBasicTitle: `${gigRef?.current?.basicTitle}`,
        gigBasicDescription: `${gigRef?.current?.basicDescription}`,
        buyerId: `${buyer._id}`,
        buyerUsername: `${buyer.username}`,
        buyerImage: `${buyer.profilePicture}`,
        buyerEmail: `${buyer.email}`,
        status: 'in progress',
        orderId,
        invoiceId,
        quantity: 1,
        dateOrdered: `${new Date()}`,
        price: offer.price,
        requirements: requirement,
        paymentIntent: `${paymentIntentId}`,
        events: {
          placeOrder: order_date,
          requirements: `${new Date()}`,
          orderStarted: `${new Date()}`
        }
      }
      const response: IResponse = await createOrder(order).unwrap()

      navigate(`/orders/${orderId}/activities`, { state: response?.order })
      deleteFromLocalStorage('paymentIntent')
    } catch (error) {
      showErrorToast('Error starting your order')
    }
  }

  useEffect(() => {
    setOrderId(`JO${generateRandomNumber(11)}`)
    setInvoiceId(`JI${generateRandomNumber(11)}`)
  }, [])

  return (
    <div className="container mx-auto lg:h-screen">
      <div className="flex flex-wrap">
        <div className="order-last w-full p-4 lg:order-first lg:w-2/3">
          <div className="mb-4 flex w-full flex-col flex-wrap bg-[#d4edda] p-4">
            <span className="text-base font-bold text-black lg:text-xl">Thank you for your purchase</span>
            <div className="flex gap-1">
              You can{' '}
              <PDFDownloadLink
                document={
                  <OrderContext.Provider value={{ orderInvoice }}>
                    <Invoice />
                  </OrderContext.Provider>
                }
                fileName={`${orderInvoice.invoiceId}.pdf`}
              >
                <div className="cursor-pointer text-blue-400 underline">download your invoice</div>
              </PDFDownloadLink>
            </div>
          </div>
          <div className="border-grey border">
            <div className="mb-3 px-4 pb-2 pt-3">
              <span className="mb-3 text-base font-medium text-black md:text-lg lg:text-xl">
                Any information you would like the seller to know?
              </span>
              <p className="text-sm">Click the button to start the order.</p>
            </div>
            <div className="flex flex-col px-4 pb-4">
              <TextAreaInput
                rows={5}
                name="requirement"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="Write a brief description..."
                className="border-grey mb-1 w-full rounded border p-3.5 text-sm font-normal text-gray-600 focus:outline-none"
              />
              <Button
                className="mt-3 rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
                label="Start Order"
                onClick={startOrder}
              />
            </div>
          </div>
        </div>

        <div className="w-full p-4 lg:w-1/3">
          <div className="border-grey mb-8 border">
            <div className="mb-2 flex flex-col border-b md:flex-row">
              <img className="w-full object-cover" src={gigRef.current?.coverImage ?? placeholder} alt="Gig Cover Image" />
            </div>
            <ul className="mb-0 list-none">
              <li className="border-grey flex border-b px-4 pb-3 pt-1">
                <div className="text-base font-bold">{offer.gigTitle}</div>
              </li>
              <li className="flex justify-between px-4 pb-2 pt-4">
                <div className="flex gap-2 text-sm font-normal">Status</div>
                <span className="rounded bg-orange-300 px-[5px] py-[2px] text-xs font-bold uppercase text-white">incomplete</span>
              </li>
              <li className="flex justify-between px-4 pb-2 pt-2">
                <div className="flex gap-2 text-sm font-normal">Order</div>
                <span className="text-sm">#{orderId}</span>
              </li>
              <li className="flex justify-between px-4 pb-2 pt-2">
                <div className="flex gap-2 text-sm font-normal">Order Date</div>
                <span className="text-sm">{dayMonthYear(`${new Date()}`)}</span>
              </li>
              <li className="flex justify-between px-4 pb-2 pt-2">
                <div className="flex gap-2 text-sm font-normal">Quantity</div>
                <span className="text-sm">x 1</span>
              </li>
              <li className="flex justify-between px-4 pb-4 pt-2">
                <div className="flex gap-2 text-sm font-normal">Price</div>
                <span className="text-sm">${offer.price}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
