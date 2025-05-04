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
  { title: "Dashboard", url: "#", icon: HomeIcon },
  { title: "All Events", url: "#", icon: CalendarIcon },
  { title: "Transaction", url: "#", icon: CurrencyDollarIcon },
  { title: "Members", url: "#", icon: UserGroupIcon },
];

export default function AppSidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const [activeItem, setActiveItem] = React.useState(activeTab);
  const handleItemClick = (title: string) => {
    onTabChange(title);
    setActiveItem(title);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 px-2">
          <Link href={process.env.NEXT_PUBLIC_BASE_URL || "/"}>
            <Image
              src="/logo.svg"
              width={160}
              height={250}
              alt="EventPOM Logo"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2 px-2">
          <OrganizationSwitcher />
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
                      href={item.url}
                      className={`flex items-center gap-2 px-3 py-2 rounded ${
                        activeItem === item.title
                          ? "bg-[#2A2A6D] text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleItemClick(item.title)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
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
