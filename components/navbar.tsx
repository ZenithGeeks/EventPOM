"use client";

import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 w-full fixed top-0 left-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center pt-4">
            <Link href={process.env.NEXT_PUBLIC_BASE_URL || "/"}>
              <Image
                src="/logo.svg"
                width={160}
                height={250}
                alt="EventPOM Logo"
              />
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-center bg-purple-500 hover:bg-purple-700 hover:border-2 hover:border-gray-400 text-white rounded-3xl w-[2.5rem] h-[2.5rem]">
                u
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end" forceMount>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/tickets">Tickets</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/application">Application</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/logout">
                  <span className="text-[#EB001B]">Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
