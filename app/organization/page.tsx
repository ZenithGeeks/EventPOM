"use client";

import { useEffect, useState } from "react";
import AppSidebar from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // ✅ use `next/navigation` in app directory
import Member from "../components/Member";

export default function OrganizationPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const router = useRouter();
 console.log(session)
  useEffect(() => {
    if (status === "loading") return; // wait for session to load
    if (session?.user.role !== "ORGANIZER") {
      router.push("/landing-page");
    }
  }, [session, status, router]);

  if (status === "loading") return <div className="p-10">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-white">
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-20">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <main className="pl-64 pt-20 w-full px-6">
        <SidebarTrigger className="absolute top-4 right-4" />

        {activeTab === "Dashboard" && (
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-4">Welcome to the dashboard.</p>
          </div>
        )}

        {activeTab === "All Events" && (
          <div>
            <h1 className="text-2xl font-bold">All Events</h1>
            <p className="mt-4">Here are all your events.</p>
          </div>
        )}

        {activeTab === "Transaction" && (
          <div>
            <h1 className="text-2xl font-bold">Transaction</h1>
            <p className="mt-4">Transaction details go here.</p>
          </div>
        )}

        {activeTab === "Members" && (
          <div>
            <h1 className="text-2xl font-bold">Members</h1>
            <p className="mt-4">Member management section.</p>
          </div>
        )}
      </main>
    </div>
  );
}
