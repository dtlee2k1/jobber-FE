import ChangePassword from './ChangePassword'

export default function Settings() {
  return (
    <div className="container mx-auto flex flex-col items-center px-6">
      <h1 className="pt-8 text-3xl font-semibold text-[#111827]">Change Password</h1>
      <div className="mt-6 w-[50%] bg-white px-6 pb-7 pt-5">
        <ChangePassword />
      </div>
    </div>
  )
}
