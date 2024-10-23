"use client"

// src/components/Navbar.tsx
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, type PropsWithChildren } from "react";

type NavLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
}>;

const NavLink = ({ href, children, className = "" }: NavLinkProps) => (
  <Link 
    href={href}
    className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors ${className}`}
  >
    {children}
  </Link>
);

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">☕ Coffee Orders</h1>
            </div>
          </div>

          {/* Middle - Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {isSignedIn && (
                <>
                  <NavLink href="/orders">Place Order</NavLink>
                  <NavLink href="/history">My Orders</NavLink>
                  <NavLink href="/incoming">Incoming Orders</NavLink>
                  <NavLink href="/settings">Settings</NavLink>
                </>
              )}
            </div>
          </div>

          {/* Right side - User Info & Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <span className="hidden text-sm font-medium text-gray-700 md:block">
                  {user.firstName} {user.lastName}
                </span>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Sign in
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {isSignedIn && (
            <>
              <NavLink 
                href="/orders"
                className="block border-l-4 border-transparent"
              >
                Place Order
              </NavLink>
              <NavLink 
                href="/incoming"
                className="block border-l-4 border-transparent"
              >
                Incoming Orders
              </NavLink>
              <NavLink 
                href="/history"
                className="block border-l-4 border-transparent"
              >
                My Orders
              </NavLink>
              <NavLink 
                href="/settings"
                className="block border-l-4 border-transparent"
              >
                Settings 
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}