
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react'

const NavigationBar = () => {
    const navigationList : string[] = ["Store", "Mac", "iPhone", "Support"];
  return (
    <header className="flex w-full py-5 px-10 md:px-5 justify-between items-center">
      <nav className="max-w-screen-xl ms-auto me-auto flex w-full relative">
        <Image
          src="/assets/images/apple.svg"
          alt="Apple logo"
          width={20}
          height={20}
        />
        <ul className="flex flex-1 justify-center max-sm:hidden">
          {navigationList.map((title: string) => (
            <li
              key={title}
              className="px-5 text-sm text-gray hover:text-white cursor-pointer transition-all"
            >
              {title}
            </li>
          ))}
        </ul>
        <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
          <MagnifyingGlassIcon className="size-5 " aria-hidden="true" />
          <ShoppingBagIcon className="size-5 " aria-hidden="true" />
        </div>
      </nav>
    </header>
  );
}

export default NavigationBar