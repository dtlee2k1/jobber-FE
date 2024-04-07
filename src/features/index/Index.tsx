import Header from 'src/shared/header/components/Header'

import GigTabs from './gig-tabs/GigTabs'
import Hero from './Hero'

export default function Index() {
  return (
    <div className="dark flex flex-col">
      <Header navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
      <Hero />
      <GigTabs />
    </div>
  )
}
