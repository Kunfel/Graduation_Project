import Link from 'next/link'
import { Activity, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DarkmodeButton } from "./DarkmodeButton"
import { auth } from '@/auth'
import { logout } from '@/actions/auth'

export async function Navbar() {
  let data = await auth()
  return (
    <header className="border-b bg-slate-100 dark:bg-slate-900 sticky top-0 z-50">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 text-2xl font-semibold">
          <span className="text-blue-600">Code</span>
          <Activity className="font-bold text-lg text-red-600" />
          <span className="text-blue-600">Blue</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-4">
          {data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{data?.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{data?.user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <form action={logout} className="w-full">
                    <Button variant="ghost" className="w-full justify-start p-0">
                      Log out
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
          <DarkmodeButton />
        </div>
      </nav>
    </header>
  )
}

