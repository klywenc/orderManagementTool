import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-200'>
      <div>
        <Link href="/">
          RamenShop
        </Link>
        <ul>
          <li>
            <Link href="/menu">
              Menu
            </Link>
          </li>
          <li>
            <Link href="/employee-panel">
              Panel Pracownika
            </Link>
          </li>
          <li>
            <Link href="/your-order">
              Twoje zamówienie
            </Link>
          </li>
          <li>
            <Link href="/cart">
              Koszyk
            </Link>
          </li>
          <li>
            <Link href="/login">
              Zaloguj
            </Link>
          </li>
          <li>
            <Link href="/logout">
              Wyloguj
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;