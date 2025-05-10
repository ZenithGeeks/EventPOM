"use client";

import React, { useState, useMemo } from "react";
import { Payment, PaymentMethod, PaymentStatus, User } from "@/types/models";

interface TransactionHistoryProps {
  payments: Payment[];
}

type SortKey = "user" | "date" | "time" | "method" | "amount" | "status";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "user", label: "Name" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "method", label: "Method" },
  { key: "amount", label: "Amount" },
  { key: "status", label: "Status" },
];

export default function TransactionHistory({
  payments,
}: TransactionHistoryProps) {
  const [sortBy, setSortBy] = useState<SortKey>("date");

  const sorted = useMemo(() => {
    return [...payments].sort((a, b) => {
      switch (sortBy) {
        case "user":
          return a.user.name.localeCompare(b.user.name);
        case "method":
          return a.paymentMethod.localeCompare(b.paymentMethod);
        case "amount":
          return b.amount - a.amount; // descending
        case "status":
          return a.status.localeCompare(b.status);
        case "time":
        case "date": {
          const da = new Date(a.createdAt);
          const db = new Date(b.createdAt);
          return da.getTime() - db.getTime();
        }
        default:
          return 0;
      }
    });
  }, [payments, sortBy]);

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(iso));

  const formatTime = (iso: string) =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(new Date(iso));

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Transaction History</h2>

      <div className="flex items-center mb-4 space-x-2 text-sm text-gray-600">
        <span>Filter By:</span>
        {COLUMNS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`
              px-3 py-1 border rounded-full text-sm
              ${sortBy === key
                ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                : "border-gray-300 text-gray-500"}
            `}
          >
            {label}
          </button>
        ))}
      </div>

      <table className="w-full table-auto">
        <thead className="bg-[#2A2A6D] text-white">
          <tr>
            {COLUMNS.map(({ key, label }) => (
              <th
                key={key}
                className={`px-4 py-2 text-left ${
                  key === "amount" ? "text-right" : ""
                }`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((tx) => (
            <tr key={tx.id} className="border-b last:border-none">
              <td className="px-4 py-3">{tx.user.name}</td>
              <td className="px-4 py-3">{formatDate(tx.createdAt)}</td>
              <td className="px-4 py-3">{formatTime(tx.createdAt)}</td>
              <td className="px-4 py-3">
                {tx.paymentMethod.replace("_", " ")}
              </td>
              <td className="px-4 py-3 text-right">{tx.amount}</td>
              <td className="px-4 py-3">
                <span
                  className={`
                    inline-flex items-center px-2 py-1 text-sm rounded-full
                    ${
                      tx.status === PaymentStatus.SUCCESS
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }
                  `}
                >
                  {tx.status === PaymentStatus.SUCCESS
                    ? "Successful"
                    : "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
