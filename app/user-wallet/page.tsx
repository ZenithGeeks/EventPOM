"use client";

import { useState } from "react";
import Image from "next/image";
import SettingsTab from "../components/user-wallet/tabs";
import MyTicket from "../components/user-wallet/user-tickets/myticket";
import { useSession } from "next-auth/react";
import SettingsComponent from "../components/user-wallet/user-settings/mysettings";
import ApplicationBox from "../components/ApplicationBox";
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Tickets");
  const { data: session } = useSession();
  console.log(session);

  const handleSave = () => {
    console.log("Save settings");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account");
  };
 
  return (
    <div className="flex flex-col md:flex-row bg-white">
      <aside className="w-full md:w-[25rem] bg-white pt-4 flex flex-col items-center">
        <div className="mb-4">
          {session?.user ? (
            <Image
              src={session.user.image ? session.user.image : "/avatar.png"}
              alt={""}
              width={150}
              height={150}
              className="rounded-full"
            ></Image>
          ) : <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
          }
        </div>
        <h2 className="text-lg font-semibold mb-6">{session?.user.name}</h2>
        <SettingsTab activeTab={activeTab} onTabChange={setActiveTab} />
      </aside>

      <main className="flex-1 p-4 md:pr-16">
        {activeTab === "Settings" && <SettingsComponent onSave={handleSave} onDeleteAccount={handleDeleteAccount} />}
        {activeTab === "Tickets" && <MyTicket />}
        {activeTab === "Applications" && <ApplicationBox/>}
      </main>
    </div>
  );
}