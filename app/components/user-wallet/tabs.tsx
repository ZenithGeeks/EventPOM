"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserIcon,
  TicketIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { id: "settings", label: "User Settings", icon: UserIcon },
  { id: "tickets", label: "Tickets", icon: TicketIcon },
  { id: "applications", label: "Applications", icon: DocumentTextIcon },
];

export default function SettingsTab() {
  const [activeTab, setActiveTab] = useState<string>("settings");

  return (
    // Let the card take full width on small screens, then 15rem on md+ if you want
    <Card className="w-[18rem] md:w-[15rem]">
      <ul className="space-y-2 py-3 pr-[4rem]">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Button
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
