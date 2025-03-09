"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MyTicket() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  return (
    <div className="p-4 md:p-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-900">Tickets</h2>
      
      {/* Tabs */}
      <div className="mt-4 border shadow-sm">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "active"
                ? "border-b-2 border-[#2A2A6D] text-gray-900"
                : "text-gray-500"
            }`}
          >
            Active tickets
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "past"
                ? "border-b-2 border-[#2A2A6D] text-gray-900"
                : "text-gray-500"
            }`}
          >
            Past tickets
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 text-center">
          {activeTab === "active" ? (
            <>
              <p className="text-lg font-semibold">
                You haven't bought any ticket
              </p>
              <p className="text-gray-500">Click here to view events</p>
              <Button className="mt-4">View events</Button>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold">No past tickets found</p>
              <p className="text-gray-500">
                You haven't attended any events yet
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
