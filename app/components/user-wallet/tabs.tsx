"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserIcon,
  TicketIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

type SettingsTabProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const TabItems = [
  { id: 1, value: "Settings", icon: UserIcon },
  { id: 2, value: "Tickets", icon: TicketIcon},
  { id: 3, value: "Applications", icon: DocumentTextIcon },
];

export default function SettingsTab({ activeTab, onTabChange }: SettingsTabProps) {
  return (
    <Card className="w-full md:w-[15rem]">
      <ul className="flex flex-row justify-around md:flex-col md:space-y-2">
        {TabItems.map((item) => (
          <li key={item.id} className="flex-1">
            <Button
              variant={activeTab === item.value ? "content" : "ghost"}
              className="justify-start gap-2 w-full md:w-[11rem]"
              asChild
              onClick={() => onTabChange(item.value)}
            >
              <div className="flex items-center gap-2">
                  <item.icon className="w-5 h-5" />
                  <span>{item.value}</span>
                </div>
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
