import { useState } from 'react'
import { FaEllipsisH, FaPauseCircle, FaPencilAlt, FaPlayCircle, FaRegStar, FaStar, FaTrashAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { ISellerGig } from 'src/interfaces/gig.interface'
import { IApprovalModalContent } from 'src/interfaces/modal.interface'
import { IGigCardItemModal } from 'src/interfaces/utils.interface'
import { useDeleteGigMutation, useUpdateActiveGigMutation } from 'src/services/gig.service'
import { useAppDispatch } from 'src/store/store'

import { updateHeader } from '../header/reducers/header.reducer'
import ApprovalModal from '../modals/ApprovalModal'
import { lowerCase, rating, replaceSpacesWithDash, showErrorToast, showSuccessToast } from '../utils/utils.service'

interface IGigCardItemProps {
  gig: ISellerGig
}

export default function GigCardItem({ gig }: IGigCardItemProps) {
  const [gigCardItemModal, setGigCardItemModal] = useState<IGigCardItemModal>({
    overlay: false,
    deleteApproval: false
  })
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>()

  const title = replaceSpacesWithDash(gig.title)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const [updateActiveGig] = useUpdateActiveGigMutation()
  const [deleteGig] = useDeleteGigMutation()

  const navigateToEditPage = (gigId: string) => {
    setGigCardItemModal({ ...gigCardItemModal, overlay: false })
    dispatch(updateHeader('home'))
    navigate(`/manage_gigs/edit/${gigId}`, { state: gig })
  }

  const onToggleGigStatus = async (active: boolean) => {
    try {
      await updateActiveGig({ gigId: `${gig.id}`, active }).unwrap()

      setGigCardItemModal({ ...gigCardItemModal, overlay: false })
      showSuccessToast('Gig status updated successfully')
    } catch (error) {
      showErrorToast('Error setting gig status')
    }
  }

  const onDeleteGig = async () => {
    try {
      await deleteGig({ gigId: `${gig.id}`, sellerId: `${gig.sellerId}` }).unwrap()

      setGigCardItemModal({ deleteApproval: false, overlay: false })
      showSuccessToast('Gig deleted successfully')
    } catch (error) {
      showErrorToast('Error deleting gig')
    }
  }
  return (
    <>
      {gigCardItemModal.deleteApproval && (
        <ApprovalModal
          approvalModalContent={approvalModalContent}
          onClick={onDeleteGig}
          onClose={() => setGigCardItemModal({ ...gigCardItemModal, deleteApproval: false })}
        />
      )}
      <div className="relative">
        {gigCardItemModal.overlay && (
          <div className="border-grey absolute bottom-0 top-0 mb-8 w-full cursor-pointer border bg-white">
            <div
              className="absolute -right-[12px] -top-[12px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-sky-500 bg-white text-sm font-bold leading-[0] text-sky-500"
              onClick={() => setGigCardItemModal({ ...gigCardItemModal, overlay: false })}
            >
              X
            </div>
            <ul className="list-none pl-0">
              <li>
                <div className="my-1 flex w-full cursor-pointer gap-4 px-4 pt-3" onClick={() => navigateToEditPage(`${gig.id}`)}>
                  <FaPencilAlt size={13} className="flex self-center" />
                  <span className="">Edit</span>
                </div>
              </li>
              <li>
                <div onClick={() => onToggleGigStatus(!gig.active)} className="my-1 flex w-full cursor-pointer gap-4 px-4 pt-3">
                  {!gig.active ? (
                    <FaPlayCircle size={13} className="flex self-center" />
                  ) : (
                    <FaPauseCircle size={13} className="flex self-center" />
                  )}
                  <span>{!gig.active ? 'Activate' : 'Pause'}</span>
                </div>
              </li>
              <li>
                <div
                  className="my-1 flex w-full cursor-pointer gap-4 px-4 pt-3"
                  onClick={() => {
                    setApprovalModalContent({
                      header: 'Delete this Gig',
                      body: 'Are you sure you want to permanently delete this gig?',
                      btnText: 'Delete',
                      btnColor: 'bg-red-500'
                    })
                    setGigCardItemModal({ ...gigCardItemModal, deleteApproval: true })
                  }}
                >
                  <FaTrashAlt size={13} className="flex self-center" />
                  <span className="">Delete</span>
                </div>
              </li>
            </ul>
          </div>
        )}

        <div className="border-grey mb-8 flex flex-col gap-2 border">
          <Link
            to={`/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`}
            onClick={() => dispatch(updateHeader('home'))}
          >
            <img src={gig.coverImage} alt="Gig cover image" className="w-full" />
          </Link>
          <div className="px-2">
            <Link
              to={`/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`}
              onClick={() => dispatch(updateHeader('home'))}
            >
              <p className="line-clamp-2 text-[#404145] hover:text-sky-500">{gig.basicDescription}</p>
            </Link>
          </div>
          <div className="flex items-center gap-2 px-2 text-orange-400">
            {parseInt(`${gig.ratingsCount}`) > 0 ? <FaStar color="orange" /> : <FaRegStar />}(
            {rating(parseInt(`${gig.ratingSum}`) / parseInt(`${gig.ratingsCount}`))})
          </div>
          <div className="flex justify-between px-2 pb-2">
            <FaEllipsisH
              size={14}
              className="cursor-pointer self-center"
              onClick={() => setGigCardItemModal({ ...gigCardItemModal, overlay: true })}
            />
            <strong className="text-base font-normal">${gig.price}</strong>
          </div>
        </div>
      </div>
    </>
  )
}
