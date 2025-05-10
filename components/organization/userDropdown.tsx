"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
export default function UserDropdown() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div className="p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <User2 className="mr-2" />
            {session?.user ? (
              <div className="text-[0.8rem]">{session.user?.name}</div>
            ) : (
              session?.user?.email?.charAt(0).toUpperCase()
            )}
            {isAuthenticated && session.user?.image ? (
              <div>
                <Image
                  src={session?.user?.image || "/avatar.png"}
                  alt={""}
                  width={25}
                  height={50}
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            )}{" "}
            <ChevronUp className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          className="w-[--radix-popper-anchor-width]"
        >
          {isAuthenticated ? (
            <>
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                <span>Sign out</span>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onClick={() => signIn()}>
              <span>Sign in</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
