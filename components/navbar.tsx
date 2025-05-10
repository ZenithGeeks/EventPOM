"use client";
import { useSession, signIn, signOut } from "next-auth/react";
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
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname()

  // Hide Navbar on specific routes
  const hideNavbar = ["/organization"]
  if (hideNavbar.includes(pathname)) {
    return (
      <div></div>
    )
  }
  else {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 w-full fixed top-0 left-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center pt-4 md:pl-[10rem]">
            <Link href={process.env.NEXT_PUBLIC_BASE_URL || "/"}>
              <Image
                src="/logo.svg"
                width={160}
                height={250}
                alt="EventPOM Logo"
              />
            </Link>
          </div>
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-center bg-purple-500 hover:bg-purple-700 hover:border-2 hover:border-gray-400 text-white rounded-3xl w-[2.5rem] h-[2.5rem]">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={""}
                      width={150}
                      height={150}
                    ></Image>
                  ) : (
                    session?.user.email?.charAt(0).toUpperCase()
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/user-wallet">Tickets</Link>
                </DropdownMenuItem>
                {session?.user.role === "ORGANIZER" && (
                  <DropdownMenuItem asChild>
                    <Link href="/organization">Organization</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/user-wallet">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user-wallet">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <div className="pl-2">
                    <Button
                      variant="destructive"
                      onClick={() => signOut()}
                    >
                      Logout
                    </Button>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => signIn()}
              variant={"ghost"}
              className="text-[#2A2A6D] font-bold text-sm"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
}
