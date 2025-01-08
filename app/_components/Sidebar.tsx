"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, User, LayoutDashboard, Stethoscope, MessageSquare, Settings, LogOut, FileText, Lock, QrCode } from 'lucide-react'
import { logout } from "@/actions/auth"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Medical", href: "/dashboard/medical", icon: Stethoscope },
  { name: "Forum", href: "/dashboard/forum", icon: MessageSquare },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "QR Generator", href: "/dashboard/qr-generator", icon: QrCode },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    subItems: [
      { name: "Personal Details", href: "/dashboard/settings/personalDetails", icon: User },
      { name: "Password", href: "/dashboard/settings/password", icon: Lock },
    ]
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className={cn(
      "relative flex h-screen flex-col border-r transition-all duration-300",
      isOpen ? "w-64" : "w-20"
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 z-40 rounded-full border"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </Button>
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <div key={item.name}>
              <Link href={item.href}>
                <span className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100 hover:text-blue-600",
                  !isOpen && "justify-center"
                )}>
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isOpen && "mr-3")} />
                  {isOpen && <span>{item.name}</span>}
                </span>
              </Link>
              {isOpen && item.subItems && (
                <div className="ml-6 mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <Link key={subItem.name} href={subItem.href}>
                      <span className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        pathname === subItem.href ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                      )}>
                        <subItem.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                        <span>{subItem.name}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <form action={logout}>
          <Button
            className={cn(
              "w-full bg-blue-600 text-white hover:bg-blue-700",
              !isOpen && "px-0"
            )}
          >
            <LogOut className={cn("h-5 w-5", isOpen && "mr-2")} />
            {isOpen && "Logout"}
          </Button>
        </form>
      </div>
    </div>
  )
}
