"use client";

import { useState } from "react";
import Image from "next/image";
import SettingsTab from "../components/user-wallet/tabs";
import MyTicket from "../components/user-wallet/user-tickets/myticket";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Tickets");
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen min-w-screen bg-white">

      <aside className="w-full md:w-[25rem] bg-white pt-4 flex flex-col items-center">
        <div className="mb-4">
          <Image
            src="/avatar.png"
            alt="Profile photo"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold mb-6">John Doe</h2>

        <SettingsTab activeTab={activeTab} onTabChange={setActiveTab} />
      </aside>

      <main className="flex-1 p-4 md:pr-16">
        {activeTab === "Settings" &&<div>User Settings</div>}
        {activeTab === "Tickets" && <MyTicket/>}
        {activeTab === "Applications" && <div>Applications Content</div>}
      </main>
    </div>
  );
}
