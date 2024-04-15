import browseImage from 'src/assets/browse.png'
import collaborate from 'src/assets/collaborate.png'
import contact from 'src/assets/contact.png'
import create from 'src/assets/create.png'

export default function HowItWorks() {
  return (
    <section className="container mx-auto bg-white">
      <div className="px-4 py-8 sm:py-16 lg:px-6">
        <div className="mb-8 lg:mb-16">
          <h2 className="mb-4 text-center text-xl font-normal tracking-tight text-sky-400 lg:text-2xl">
            How <strong className="font-extrabold">Jobber</strong> works?
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Find quality scholars, experts and freelancers for your next academic or business project.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto my-0 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={create} className="h-15 w-15 dark:text-sky-400" alt="Create an account" />
            </div>
            <h3 className="mb-2 text-base font-bold dark:text-sky-400 lg:text-xl">Create an account</h3>
            <p className="text-gray-500 dark:text-gray-400 lg:text-base">Create an account on Jobber</p>
          </div>
          <div className="text-center">
            <div className="mx-auto my-0 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={browseImage} className="h-15 w-15" alt="Browse Experts" />
            </div>
            <h3 className="mb-2 text-base font-bold dark:text-sky-400 lg:text-xl">Browse Experts</h3>
            <p className="text-gray-500 dark:text-gray-400">Browse and select the best expert for your work.</p>
          </div>
          <div className="text-center">
            <div className="mx-auto my-0 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={contact} className="h-15 w-15" alt="Contact Experts" />
            </div>
            <h3 className="mb-2 text-base font-bold dark:text-sky-400 lg:text-xl">Contact Experts</h3>
            <p className="text-gray-500 dark:text-gray-400">You can send direct messages to experts.</p>
          </div>
          <div className="text-center">
            <div className="mx-auto my-0 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={collaborate} className="h-15 w-15" alt="Collaborate" />
            </div>
            <h3 className="mb-2 text-base font-bold dark:text-sky-400 lg:text-xl">Collaborate</h3>
            <p className="text-gray-500 dark:text-gray-400">Collaborate with suitable expert for your projects.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
