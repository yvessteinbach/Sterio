'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';

const languages = [
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'FR', label: 'Français' },
];

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const isAnimating = useRef(false);
  const [selected, setSelected] = useState('EN');

  const selectLanguage = (code: string) => {
    setSelected(code);
    setIsOpen(false);
  };

  const toggleLanguageMenu = () => {
    if (isAnimating.current) return;

    const overlay = overlayRef.current;
    const items = listRef.current?.querySelectorAll('li');

    if (!overlay || !items) return;

    if (!isOpen) {
      setIsOpen(true);
      isAnimating.current = true;

      // Prepare items for entrance animation
      gsap.set(items, { opacity: 0, y: 20 });

      // Animate overlay in
      gsap.fromTo(
        overlay,
        { y: -50, opacity: 0, pointerEvents: 'none' },
        {
          y: 0,
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.4,
          ease: 'power3.out',
        }
      );

      // Animate each language item
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.1,
        ease: 'power2.out',
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    } else {
      isAnimating.current = true;

      // Animate items out
      gsap.to(items, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power1.in',
      });

      // Animate overlay out
      gsap.to(overlay, {
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
      {/* EN Button */}
      <button
        onClick={toggleLanguageMenu}
        className="z-100 text-sm font-medium whitespace-nowrap px-3 py-2 hover:text-gray-400 duration-100 rounded-full backdrop-blur-xl"
      >
        {selected}
      </button>

      {/* Overlay with conditional visibility */}
      <div
        ref={overlayRef}
        className={`z-[10] fixed top-0 left-0 w-screen h-screen bg-white/5 backdrop-blur-xs ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ opacity: isOpen ? 1 : 0 }}
      >
        <ul
          ref={listRef}
          className="w-fit flex flex-col px-8 pt-32 gap-6"
        >
          {languages.map((lang) => (
            <li
              key={lang.code}
              className="menu-item text-4xl font-medium p-2 hover:text-gray-300 cursor-pointer"
              onClick={() => selectLanguage(lang.code)}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
