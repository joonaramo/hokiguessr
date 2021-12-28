import { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  PlusSmIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline';

const sidebarNavigation = [
  { name: 'Home', to: '.', icon: HomeIcon },
  { name: 'Players', to: 'players', icon: UserGroupIcon },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SideNavigation = () => {
  return (
    <>
      {sidebarNavigation.map((item, idx) => (
        <NavLink
          end={idx === 0}
          key={item.name}
          to={item.to}
          className={({ isActive }) =>
            classNames(
              isActive
                ? 'bg-indigo-800 children:text-white'
                : 'text-indigo-300 hover:bg-indigo-800',
              'children:hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
            )
          }
        >
          <item.icon className='h-6 w-6' aria-hidden='true' />
          <span className='mt-2 text-indigo-100'>{item.name}</span>
        </NavLink>
      ))}
    </>
  );
};

const MobileMenu = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <Transition.Root show={mobileMenuOpen} as={Fragment}>
      <Dialog as='div' className='md:hidden' onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-40 flex'>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-1 right-0 -mr-14 p-1'>
                  <button
                    type='button'
                    className='h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                    <span className='sr-only'>Close sidebar</span>
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 px-4 flex items-center'>
                <img
                  className='h-8 w-auto'
                  src='https://tailwindui.com/img/logos/workflow-mark.svg?color=white'
                  alt='Workflow'
                />
              </div>
              <div className='mt-5 flex-1 h-0 px-2 overflow-y-auto'>
                <nav className='h-full flex flex-col'>
                  <div className='space-y-1'>
                    <SideNavigation />
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className='h-full flex'>
        {/* Narrow sidebar */}
        <div className='hidden w-28 bg-indigo-700 overflow-y-auto md:block'>
          <div className='w-full py-6 flex flex-col items-center'>
            <div className='flex-shrink-0 flex items-center'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/workflow-mark.svg?color=white'
                alt='Workflow'
              />
            </div>
            <div className='flex-1 mt-6 w-full px-2 space-y-1'>
              <SideNavigation />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Content area */}
        <div className='flex-1 flex flex-col overflow-hidden'>
          <header className='w-full'>
            <div className='relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex'>
              <button
                type='button'
                className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className='sr-only'>Open sidebar</span>
                <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
              </button>
              <div className='flex-1 flex justify-between px-4 sm:px-6'>
                <div className='flex items-center'>
                  <h1 className='text-3xl'>HokiGuessr</h1>
                </div>
                <div className='ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='relative flex-shrink-0'>
                    <div>
                      <Menu.Button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        <span className='sr-only'>Open user menu</span>
                        <img
                          className='h-8 w-8 rounded-full'
                          src='https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                          alt=''
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type='button'
                    className='flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <PlusSmIcon className='h-6 w-6' aria-hidden='true' />
                    <span className='sr-only'>Add file</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className='flex-1 flex items-stretch overflow-hidden'>
            <main className='flex-1 overflow-y-auto'>{children}</main>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className='hidden w-96 bg-white border-l border-gray-200 overflow-y-auto lg:block'>
              {/* Your content */}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};
