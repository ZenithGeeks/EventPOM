"use client";

import Image from "next/image";
import SettingsTab from "../components/user-wallet/tabs";
import MyTicket from "../components/user-wallet/myticket";

export default function SettingsPage() {
  return (
    // Use flex-col for mobile, switch to flex-row at md breakpoint
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* LEFT SIDEBAR (aside) */}
      <aside
        // On mobile, full width; from md and up, fixed width (25rem)
        className="w-full md:w-[25rem] bg-white pt-4 flex flex-col items-center"
      >
        {/* Profile Photo (can hide or show differently with breakpoints if needed) */}
        <div className="mb-4">
          <Image
            src="/avatar.png"
            alt="Profile photo"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>

        {/* User name */}
        <h2 className="text-lg font-semibold mb-6">John Doe</h2>

        {/* Settings Tab Menu */}
        <SettingsTab />
      </aside>

      {/* MAIN CONTENT */}
      <main
        // Add some padding, then at md screens add extra right padding if desired
        className="flex-1 p-4 md:pr-16"
      >
        <MyTicket />
      </main>
    </div>
  );
}
