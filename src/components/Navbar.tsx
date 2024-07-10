/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="flex justify-between items-center w-full lg:px-0 px-8 md:h-0 h-24">
        <Link href="/">
          <img src="/images/logo.svg" className="logo" alt="" />
        </Link>
        <ul className={`flex flex-col menu_items ${isOpen ? "active" : ""}`}>
          <div className="flex items-center justify-center gap-10">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg lg:hidden text-sm w-8 h-8 absolute lg:relative top-2.5 end-2.5 inline-flex items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                ></path>
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
            <li>
              <a href="#about" className="uppercase text-sm">
                About us
              </a>
            </li>
            <li>
              <a href="#how-to-buy" className="uppercase text-sm">
                How to buy
              </a>
            </li>
            <li>
              <a href="#roadmap" className="uppercase text-sm">
                Roadmap
              </a>
            </li>
            <li>
              <a href="#faqs" className="uppercase text-sm">
                Faqs
              </a>
            </li>
          </div>
          <div className="flex items-end justify-end lg:hidden">
            <a
              target="_blank"
              href="https://www.megadice.com/"
              className="px-4 py-3 text-sm font-bold tracking-widest uppercase bg-primary ring-1 ring-primary"
            >
              Play Now
            </a>
          </div>
        </ul>

        <div className="menu lg:hidden block">
          <button onClick={() => setIsOpen(true)}>
            <img
              src="/images/menu.svg"
              className="h-8 w-8 cursor-pointer"
              alt=""
            />
          </button>
        </div>
        <div className="lg:flex hidden items-center gap-5">
          <div className="items-center gap-x-2 flex">
            <a
              href="https://twitter.com/megadice"
              className="flex items-center justify-center w-8 h-8 border rounded-full border-primary"
            >
              <img
                alt="twitter"
                title="twitter"
                loading="lazy"
                width="13"
                height="12"
                decoding="async"
                data-nimg="1"
                src="/images/twitter.svg"
                className="text-transparent"
              />
            </a>
            <a
              href="https://t.me/Megadicecasino"
              className="flex items-center justify-center w-8 h-8 border rounded-full border-primary"
            >
              <img
                alt="telegram"
                title="telegram"
                loading="lazy"
                width="14"
                height="15"
                decoding="async"
                data-nimg="1"
                src="/images/telegram.svg"
                className="text-transparent"
              />
            </a>
          </div>
          <div className="flex items-center justify-around gap-x-4 lg:justify-normal">
            <a
              target="_blank"
              href="https://www.megadice.com/"
              className="px-4 py-3 text-sm font-bold tracking-widest uppercase bg-primary ring-1 ring-primary"
            >
              Play Now
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

