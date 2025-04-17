"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

import LanguageDropdown from '@/components/theme/languagedropdown';

export function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const isAnimating = useRef(false); // prevent double clicks

  const toggleMenu = () => {
    const menu = menuRef.current;
    const items = listRef.current?.querySelectorAll('.menu-item');

    if (!menu || !items || isAnimating.current) return;

    if (!isOpen) {
      setIsOpen(true);


    // Reset item styles instantly before animation
    gsap.set(items, { opacity: 0, y: 20 });

    // Animate menu in
    gsap.fromTo(
      menu,
      { y: -50, opacity: 0, pointerEvents: 'none' },
      {
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power3.out',
      }
    );

    // Start link animation a little after menu starts (not after it's done)
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.15,
        onComplete: () => {
          isAnimating.current = false;
        },
      }
    );
  } else {
    // Animate links out
    gsap.to(items, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power1.in',
    });

    // Animate menu out
    gsap.to(menu, {
      y: -50,
      opacity: 0,
      pointerEvents: 'none',
      delay: 0.15,
      duration: 0.4,
      ease: 'power1.in',
      onComplete: () => {
        setIsOpen(false);
        isAnimating.current = false;
      },
    });
  }
};

  return (
    <>
      <header className="z-[100] absolute w-full top-0 left-0 py-4 px-10 md:py-6 lg:py-6 border-b-2 border-solid bg-black">
        <div className="flex justify-between items-center">
          <div className="">
            <span className="font-medium text-xl md:text-2xl lg:text-2xl">
              <Link href="/">Sterio</Link>
            </span>
          </div>
          <div className="relative flex">
            <nav className="text-md lg:block">
              <div className="navigation-js flex items-start gap-4">
                <LanguageDropdown />
                <button className="text-sm font-semibold whitespace-nowrap px-3 py-2 bg-white/20 rounded-full backdrop-blur-xl hover:cursor-pointer" onClick={toggleMenu}>
                  {isOpen ? 'CLOSE' : 'MENU'}
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        className={`z-20 fixed top-0 left-0 w-screen h-screen bg-white/5 backdrop-blur-xs ${
          isOpen ? '' : 'pointer-events-none'
        }`}
        style={{ opacity: 0 }}
      >
        <ul ref={listRef} className="w-fit flex flex-col px-8 pt-32 gap-6">
          <li className="menu-item text-4xl font-medium p-2 hover:text-gray-300 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="menu-item text-4xl font-medium p-2 hover:text-gray-300 cursor-pointer">
            <Link href="/explore">Explore</Link>
          </li>
          <li className="menu-item text-4xl font-medium p-2 hover:text-gray-300 cursor-pointer">
            <Link href="/favorites">Favorites</Link>
          </li>
          <li className="menu-item text-4xl font-medium p-2 hover:text-gray-300 cursor-pointer">
            <Link href="/search">Search</Link>
          </li>
          <li className="menu-item text-4xl font-medium p-2 hover:text-gray-300 cursor-pointer">
            <Link href="/account">Account</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
