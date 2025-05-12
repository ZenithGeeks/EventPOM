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
import { useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
interface Org {
  id: string;
  name: string;
  status: string;
}

export default function OrganizationSwitcher({
  setOrganizerId,
}: {
  setOrganizerId: (id: string) => void;
}) {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Org | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;
    fetch(`/api/users/${session.user.id}/organizers`)
      .then((res) => res.json())
      .then((data: Org[]) => {
        setOrgs(data || []);
        const approvedOrg = data.find((org) => org.status === "APPROVED");
        if (approvedOrg) {
          setSelectedOrg(approvedOrg);
          setOrganizerId(approvedOrg.id);
        } else {
          setSelectedOrg(null);
          setOrganizerId("");
        }
        console.log("Fetched organizations:", data);
      })
      .catch((err) => {
        console.error("Failed to fetch organizations:", err);
        setOrgs([]);
      })
      .finally(() => setLoading(false));
  }, [session?.user?.id, setOrganizerId]);

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
                  disabled={org.status === "PENDING"}
                  onClick={() => {
                    if (org.status !== "PENDING") {
                      setSelectedOrg(org);
                      setOrganizerId(org.id);
                    }
                  }}
                  className={`${
                    selectedOrg?.id === org.id ? "bg-muted" : ""
                  } ${org.status === "PENDING" ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">
                    {org.name}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] py-0.5 px-2 rounded-md ${
                      org.status === "PENDING"
                        ? "text-yellow-600 border-yellow-600"
                        : org.status === "APPROVED"
                        ? "text-green-600 border-green-600"
                        : "text-red-600 border-red-600"
                    }`}
                  >
                    {org.status}
                  </Badge>
                </div>
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
