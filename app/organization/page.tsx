"use client";

import { useEffect, useState } from "react";
import AppSidebar from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import CreateEventForm from "../components/CreateEventForm/CreateEventForm";
import { useRouter } from "next/navigation";
import OrganizationDashboard from "../components/organization/dashboard/dashboard";
import RecipientDetail from "../components/transaction/RecipientDetail";
import TransactionHistory from "../components/transaction/TransactionHistory";
import type { Payment } from "@/types/models";

export default function OrganizationPage() {
  const { data: session, status } = useSession();
  const [organizerId, setOrganizerId] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const router = useRouter();
//NEW
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user.role !== "ORGANIZER") {
      router.push("/landing-page");
    }
  }, [session, status, router]);

  // NEW: fetch payments when Transaction tab is selected
  useEffect(() => {
    if (activeTab !== "Transaction") return;

    setLoadingPayments(true);
    fetch("/api/payments", { cache: "no-store" })
      .then((res) => res.json())
      .then((json: { success: boolean; data: Payment[] }) => {
        setPayments(json.data || []);
      })
      .catch((err) => {
        console.error("Failed to load payments:", err);
        setPayments([]);
      })
      .finally(() => setLoadingPayments(false));
  }, [activeTab]);

  if (status === "loading") return <div className="p-10">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Sidebar - hidden on small screens */}
      <div className="hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-20">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} setOrganizerId={setOrganizerId}/>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full md:ml-32 px-4 sm:px-8 md:px-12 py-8">
        {/* Show sidebar trigger button on small screens */}
        <div className="md:hidden flex justify-end mb-4">
          <SidebarTrigger />
        </div>

        {activeTab === "Dashboard" && (
          <div>
            <OrganizationDashboard />
          </div>
        )}
        {activeTab === "All Events" && (
          <div>
            <h1 className="text-2xl font-bold">All Events</h1>
            <p className="mt-4">Here are all your events.</p>
          </div>
        )}
        {activeTab === "Event Details" && (
          <div>
            <h1 className="text-2xl font-bold">Event Details</h1>
            <p className="mt-4">Here are all your events.</p>
          </div>
        )}
        {activeTab === "Create New Event" && (
          <div>
            <CreateEventForm organizerId={organizerId} />
          </div>
        )}
        {activeTab === "Transaction" && (
          <div>
            <h1 className="text-2xl font-bold">Transaction</h1>
            <RecipientDetail
              name="CPE Gogo"
              bank="Kasikorn Bank"
              accountNo="123-456-7890"
              country="Thailand"
            />
            <TransactionHistory payments={payments} />
            
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
