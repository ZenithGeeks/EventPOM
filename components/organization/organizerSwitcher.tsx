"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
interface Org {
  id: string;
  name: string;
}

export default function OrganizationSwitcher() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Org | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/organizations")
      .then((res) => res.json())
      .then((data: Org[]) => {
        setOrgs(data || []);
        if (data.length > 0) setSelectedOrg(data[0]);
      })
      .catch((err) => {
        console.error("Failed to fetch organizations:", err);
        setOrgs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className=" font-bold border-2 border-gray-400 bg-white hover:bg-gray-100">
            {loading ? (
              "Loading..."
            ) : selectedOrg ? (
              <div className="flex flex-row p-2 gap-2">
                {selectedOrg.name} {""} <BuildingOffice2Icon width={15} />
              </div>
            ) : (
              "Select Organization"
            )}
            <ChevronDown className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[--radix-popper-anchor-width] max-h-64 overflow-y-auto"
          align="start"
        >
          {orgs.length > 0 ? (
            orgs.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => setSelectedOrg(org)}
                className={selectedOrg?.id === org.id ? "bg-muted" : ""}
              >
                <div className="font-bold">{org.name}</div>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>No organizations found</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
