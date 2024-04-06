import Header from 'src/shared/header/components/Header'

export default function Index() {
  return (
    <div className="flex flex-col">
      <Header navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
    </div>
  )
}
