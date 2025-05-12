"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  HomeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import OrganizationSwitcher from "./organization/organizerSwitcher";
import Link from "next/link";
import Image from "next/image";
import UserDropdown from "./organization/userDropdown";

const items = [
  { title: "Dashboard", icon: HomeIcon, subItems: [] },
  {
    title: "All Events",
    icon: CalendarIcon,
    subItems: ["Event Details","Create New Event","QRcode"],
  },
  {
    title: "Transaction",
    icon: CurrencyDollarIcon,
    subItems: [],
  },
  {
    title: "Members",
    icon: UserGroupIcon,
    subItems: [],
  },
];

export default function AppSidebar({
  activeTab,
  onTabChange,
  setOrganizerId
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  setOrganizerId: (id: string) => void;
}) {
  const handleItemClick = (title: string) => {
    onTabChange(title);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 px-2">
          <Link href={"/landing-page"}>
            <Image
              src="/logo.svg"
              width={160}
              height={250}
              alt="EventPOM Logo"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2 px-2">
          <OrganizationSwitcher setOrganizerId={setOrganizerId} />
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto py-4 px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      onClick={() => handleItemClick(item.title)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded ${
                        activeTab === item.title
                          ? "bg-[#2A2A6D] text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>

                  {item.subItems.length > 0 && (
                    <SidebarMenuSub>
                      {item.subItems.map((subTitle) => (
                        <SidebarMenuSubItem key={subTitle}>
                          <SidebarMenuSubButton asChild>
                            <a
                              onClick={() => handleItemClick(subTitle)}
                              className={`w-full text-left px-6 py-2 text-sm rounded ${
                                activeTab === subTitle
                                  ? "bg-[#2A2A6D] text-white"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              {subTitle}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserDropdown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
