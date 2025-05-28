"use client"
import { useState } from "react";
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='bg-black'>
      <div className="container mx-auto sticky w-full lg:w-2/3">
        <div className="items-center justify-center py-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between space-x-8">
            <a href="/">
              <img width={60} height={60} src="https://i.postimg.cc/R0NpvBfZ/white.png" alt="" />
            </a>
            <a href="">
              <button className="bg-[#F3C42E] hover:bg-[#f0c817ce] text-white rounded-lg px-5 py-2 transition-colors">
                Login
              </button>
            </a>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center justify-between lg:hidden mx-4">
            <a href="/">
              <img width={60} height={60} src="https://i.postimg.cc/R0NpvBfZ/white.png" alt="" />
            </a>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        } overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <nav className="container mx-auto px-4 pb-5">
          <ul className="space-y-4 py-2">
            <li>
              <Link
                href="/"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-50 hover:text-[#0055c2] rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-50 hover:text-[#0055c2] rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-50 hover:text-[#0055c2] rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-50 hover:text-[#0055c2] rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
            </li>
                        <li>
              <Link
                href="/contact"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-50 hover:text-[#0055c2] rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <a href="https://demo.roadrimz.com/">
              <button className="bg-[#F3C42E] hover:bg-[#f0c817ce] text-white rounded-lg px-5 py-2 transition-colors">
                Try Demo
              </button>
            </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;