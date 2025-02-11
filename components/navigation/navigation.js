import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-200 px-2 sm:px-4 shadow-lg'>
      <div className='max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto p-1'>
        <Link
          href="/"
          className="px-2 py-4 text-4xl font-extrabold text-orange-600"
        >
          Megumi Ramen
        </Link>
        <ul className='text-base flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-200 md:dark:bg-gray-200 dark:border-gray-200'>
          <li>
            <Link
              href="/menu"
              className='block py-2 px-3 text-orange-600 rounded-sm md:text-orange-600 md:p-0 md:hover:text-red-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-full'
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/employeePanel"
              className='block py-2 px-3 text-gray-600 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-600 dark:hover:text-orange-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full'
            >
              Panel Pracownika
            </Link>
          </li>
          <li>
            <Link
              href="/adminPanel"
              className='block py-2 px-3 text-gray-600 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-600 dark:hover:text-orange-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full'
            >
              Panel Administratora
            </Link>
          </li>
          <li>
            <Link
              href="/orderStatus"
              className='block py-2 px-3 text-gray-600 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-600 dark:hover:text-orange-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full'
            >
              Twoje zamówienie
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className='block py-2 px-3 text-gray-600 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-600 dark:hover:text-orange-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full'
            >
              Koszyk
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className='block py-2 px-3 text-gray-600 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-600 dark:hover:text-orange-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full'
            >
              Zaloguj
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className='block py-2 px-3 text-gray-600 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-600 dark:hover:text-orange-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full'
            >
              Zarejestruj
            </Link>
          </li>
          <li>
            <Link
              href="/logout"
              className='block py-2 px-3 text-gray-600 rounded-sm md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-600 dark:hover:text-orange-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full'
            >
              Wyloguj
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;