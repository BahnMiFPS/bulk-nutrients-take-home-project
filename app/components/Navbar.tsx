'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from '../logo.png';
import LogoDark from '../logo-dark.png';
import { useTheme } from 'next-themes';
import ThemeSwitch from './ThemeSwitch';
import { useEffect, useState } from 'react';
import { classNames } from '../utils/utils';

const navigation = [{ name: 'Dashboard', href: '/' }];

export default function Navbar() {
  const pathname = usePathname();
  const [logoSrc, setLogoSrc] = useState(Logo);

  const { theme } = useTheme();
  useEffect(() => {
    setLogoSrc(theme === 'dark' ? LogoDark : Logo);
  }, [theme]);
  return (
    <nav className="bg-white dark:bg-[#0A0A0A] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <a className="flex flex-shrink-0 items-center" href="/">
              <Image src={logoSrc} alt="Bulk Nutrients" width={100} />
            </a>
            <div className=" -my-px ml-6 flex space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'border-yellow-500 text-gray-900 dark:border-yellow-300 dark:text-gray-100'
                      : 'border-transparent text-gray-500 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700',
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className=" ml-6 flex items-center">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}
