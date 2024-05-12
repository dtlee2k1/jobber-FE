export default function CheckoutFormSkeleton() {
  return (
    <div className="px-4 pb-4">
      <div className="w-full animate-pulse">
        <div className="flex space-x-3">
          <div className="h-10 w-[60%] rounded bg-gray-200"></div>
          <div className="h-10 w-[20%] rounded bg-gray-200"></div>
          <div className="h-10 w-[20%] rounded bg-gray-200"></div>
        </div>
        <div className="mt-6 flex">
          <div className="h-10 w-full rounded bg-gray-200"></div>
        </div>
        <div className="mt-8 flex">
          <div className="h-10 w-full rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}
