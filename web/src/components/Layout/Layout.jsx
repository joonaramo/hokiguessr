import { Fragment, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  HomeIcon,
  MenuAlt2Icon,
  TableIcon,
  XIcon,
  UserCircleIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
import { classNames } from '../../utils/classnames';
import { LiveGames } from '../LiveGames';
import logo from './logo.svg';
import storage from '../../utils/storage';
import { useQueryClient } from 'react-query';

const sidebarNavigation = [
  { name: 'Home', to: '.', icon: HomeIcon },
  { name: 'Games', to: 'games', icon: ViewGridIcon },
  { name: 'Predictions', to: 'predictions', icon: TableIcon },
];
const userNavigation = [{ name: 'Your Profile', href: '#' }];

const SideNavigation = ({ setMobileMenuOpen }) => {
  return (
    <>
      {sidebarNavigation.map((item, idx) => (
        <NavLink
          end={idx === 0}
          key={item.name}
          to={item.to}
          onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
          className={({ isActive }) =>
            classNames(
              isActive
                ? 'bg-black children:text-white'
                : 'text-gray-300 hover:bg-black',
              'children:hover:text-white group w-full px-3 py-2 md:p-3 rounded-md flex md:flex-col items-center text-sm md:text-xs font-medium'
            )
          }
        >
          <item.icon className='h-6 w-6 mr-3 md:mr-0' aria-hidden='true' />
          <span className='mt-0 md:mt-2 text-gray-200'>{item.name}</span>
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
            <div className='relative max-w-xs w-full bg-gray-900 pt-5 pb-4 flex-1 flex flex-col'>
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
                <img className='h-8 w-auto mr-3' src={logo} alt='Workflow' />
                <h1 className='text-2xl text-white'>HokiGuessr</h1>
              </div>
              <div className='mt-5 flex-1 h-0 px-2 overflow-y-auto'>
                <nav className='h-full flex flex-col'>
                  <div className='space-y-1'>
                    <SideNavigation setMobileMenuOpen={setMobileMenuOpen} />
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
  const { refetchUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = async () => {
    storage.clearToken();
    queryClient.clear();
    await refetchUser();
    navigate('/login');
  };

  return (
    <>
      <div className='h-full flex'>
        {/* Narrow sidebar */}
        <div className='hidden w-28 bg-gray-900 overflow-y-auto md:block'>
          <div className='w-full py-6 flex flex-col items-center'>
            <div className='flex-shrink-0 flex items-center'>
              <img className='h-8 w-auto' src={logo} alt='Workflow' />
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
            <div className='relative z-10 flex-shrink-0 h-16 bg-zinc-900 shadow shadow-black flex'>
              <button
                type='button'
                className='border-r border-gray-700 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:hidden'
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className='sr-only'>Open sidebar</span>
                <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
              </button>
              <div className='flex-1 flex justify-between px-4 sm:px-6'>
                <div className='flex items-center'>
                  <h1 className='text-2xl text-white'>HokiGuessr</h1>
                </div>
                <div className='ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='relative flex-shrink-0'>
                    <div>
                      <Menu.Button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
                        <span className='sr-only'>Open user menu</span>
                        <UserCircleIcon
                          className='h-9 w-9'
                          aria-hidden='true'
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
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => logout()}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className='flex-1 flex items-stretch overflow-hidden'>
            <main className='flex-1 overflow-y-auto bg-gray-800'>
              {children}
            </main>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className='hidden w-96 bg-gray-900 border-l border-gray-500 overflow-y-auto lg:block'>
              <LiveGames />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};
