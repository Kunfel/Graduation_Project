'use client'

import * as React from "react"
import Link from "next/link"
import { Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
//import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="border-b bg-slate-100 sticky top-0 z-50">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 text-2xl font-semibold">
          <span className="text-blue-600">Code</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6 text-[#ff8585]"
          >
            <path d="M2 12h6l4-8 4 16 4-8h4" />
          </svg>
          <span className="text-blue-600">Blue</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            about
          </Link>
          <Button
            variant="ghost"
            className="text-white bg-blue-600 hover:bg-blue-500"
            asChild
          >
            <Link href="/login">login</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href="/home"
                className="text-sm text-gray-600 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                home
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                about
              </Link>
              <Button
                variant="ghost"
                className="justify-start text-blue-600 hover:bg-blue-50"
                asChild
              >
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  login
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet> */}
      </nav>
    </header>
  )
}



