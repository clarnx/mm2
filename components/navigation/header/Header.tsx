// import { Button } from '@material-tailwind/react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import en from '../../../locales/en/navbar';
// import es from '../../../locales/es/navbar';

// export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

// const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
//   const router = useRouter();
//   const { locale } = router;

//   const t = locale === 'en' ? en : es;

//   const changeLanguage = (e: any) => {
//     const locale = e.target.value;
//     router.push(router.pathname, router.asPath, { locale });
//   };

//   return (
//     <header
//       {...headerProps}
//       className={`w-full flex flex-row justify-between items-center shadow-md ${className}`}
//     >
//       <div className="space-x-5 m-5">
//         <Link href="/">
//           <a className="hover:underline font-semibold ">{t.item1}</a>
//         </Link>
//         <Link href="/talent-register">
//           <a className="hover:underline font-semibold ">{t.item2}</a>
//         </Link>
//       </div>
//       <div className="space-x-5 m-5 flex items-center">
//         <div>
//           <Button>Login</Button>
//         </div>
//         <select
//           className="cursor-pointer p-2 outline-none"
//           defaultValue={locale}
//           onChange={changeLanguage}
//         >
//           <option className="p-2" value="en">
//             EN
//           </option>
//           <option className="p-2" value="es">
//             ES
//           </option>
//         </select>
//       </div>
//     </header>
//   );
// };

// export default Header;

import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import en from '../../../locales/en/navbar';
import es from '../../../locales/es/navbar';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();
  const { locale } = router;

  const t = locale === 'en' ? en : es;

  const changeLanguage = (e: any) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/">
          <a className="hover:underline font-semibold ">{t.item1}</a>
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/talent-register">
          <a className="hover:underline font-semibold ">{t.item2}</a>
        </Link>
      </Typography>
    </ul>
  );

  return (
    <header {...headerProps} className={`${className}`}>
      <Navbar fullWidth={true} className="">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-normal"
          >
            <span>Academlo Recruiter</span>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">{navList}</div>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>{t.login}</span>
            </Button>
            <select
              className="cursor-pointer p-2 outline-none hidden lg:inline-block"
              defaultValue={locale}
              onChange={changeLanguage}
            >
              <option className="p-2" value="en">
                EN
              </option>
              <option className="p-2" value="es">
                ES
              </option>
            </select>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex gap-3 pb-3">
            <button
              onClick={() =>
                router.push(router.pathname, router.asPath, { locale: 'en' })
              }
              className="bg-blue-gray-800 p-2 rounded"
            >
              EN
            </button>
            <button
              onClick={() =>
                router.push(router.pathname, router.asPath, { locale: 'es' })
              }
              className="bg-blue-gray-800 p-2 rounded"
            >
              ES
            </button>
          </div>
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Login</span>
          </Button>
        </MobileNav>
      </Navbar>
    </header>
  );
};

export default Header;
