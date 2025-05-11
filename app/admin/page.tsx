"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserTable from "../components/admin/usersTable";
import EventsTable from "../components/admin/eventsTable";
import CategoryTab from "../components/admin/categoryTable";
export default function SettingsPage() {
const { data: session, status } = useSession();
const router = useRouter();
const [activeTab, setActiveTab] = useState("All Users");
useEffect(() => {
    if (status === "loading") return;
    if (session?.user.role !== "ADMIN") {
    router.push("/not-found");
    }
}, [session, status, router]);
if(session?.user.role === "ADMIN") {
  return (
     <div className="flex flex-col md:flex-row bg-white">
        <div className="hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-20">
                <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab}/>
        </div>
         <main className="flex-1 w-full px-4 sm:px-8 md:px-12 py-8">
        <div className="absolute top-4 right-4 flex justify-end mb-4">
          <SidebarTrigger />
        </div>
        
        {activeTab === "All Users" && (
            <div>
                <UserTable/>
            </div>

        )}
        {activeTab === "Organization Applications" && (
          <div>
            <h1 className="text-2xl font-bold">Event Details</h1>
            <p className="mt-4">Here are all your events.</p>
          </div>
        )}
        {activeTab === "Event Applications" && (
          <div>
            <EventsTable/>
          </div>
        )}
        {activeTab === "Members" && (
          <div className="w-full ">
            <h1 className="text-2xl font-bold">Members</h1>
            <p className="mt-4">Member management section.</p>
          </div>
        )}
          {activeTab === "Categories" && (
          <div className="w-[100vh] ">
          <CategoryTab/>
          </div>
        )}
      </main>
  </div>
  )

}
}
