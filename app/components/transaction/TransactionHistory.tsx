"use client";

import React, { useState, useMemo } from "react";
import { Payment, PaymentStatus, PaymentMethod } from "@/types/models";

interface TransactionHistoryProps {
  payments: Payment[];
}

const FILTER_KEYS = [
  { key: "user",      label: "Name" },
  { key: "dateTime",  label: "Date & Time" },
  { key: "method",    label: "Method" },
  { key: "amount",    label: "Amount" },
  { key: "status",    label: "Status" },
] as const;

type FilterKey = typeof FILTER_KEYS[number]["key"];

export default function TransactionHistory({
  payments,
}: TransactionHistoryProps) {
  const [filterBy, setFilterBy] = useState<FilterKey>("user");

  const rows = useMemo(
    () =>
      payments.map((p) => {
        const date = new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(p.createdAt));
        const time = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
        }).format(new Date(p.createdAt));
        return {
          id: p.id,
          user: p.user.name,
          dateTime: `${date} ${time}`,
          method:
            p.paymentMethod === PaymentMethod.PROMPTPAY
              ? "Promptpay"
              : p.paymentMethod.replaceAll("_", " "),
          amount: p.amount,
          status:
            p.status === PaymentStatus.SUCCESS
              ? "Successful"
              : p.status === PaymentStatus.PENDING
              ? "Pending"
              : "Failed",
          rawStatus: p.status,
        };
      }),
    [payments]
  );

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      if (filterBy === "amount") {
        return b.amount - a.amount;
      }
      const A = String(a[filterBy] ?? "").toUpperCase();
      const B = String(b[filterBy] ?? "").toUpperCase();
      return A.localeCompare(B);
    });
  }, [rows, filterBy]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto border rounded-lg space-y-6">
        <div>
          <h2 className="text-lg font-semibold p-6 ">Transaction History</h2>
          <div className="flex items-center flex-wrap gap-3 px-6 text-sm text-gray-600">
            <span>Filter By:</span>
            {FILTER_KEYS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilterBy(key)}
                className={`px-4 py-1 border rounded-full transition ${
                  filterBy === key
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#2A2A6D]">
              <tr>
                <th className="px-4 py-3 text-left text-white">Name</th>
                <th className="px-4 py-3 text-left text-white">Date &amp; Time</th>
                <th className="px-4 py-3 text-left text-white">Method</th>
                <th className="px-4 py-3 text-right text-white">Amount</th>
                <th className="px-4 py-3 text-left text-white">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sorted.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3 text-gray-700">{row.user}</td>
                  <td className="px-4 py-3 text-gray-700">{row.dateTime}</td>
                  <td className="px-4 py-3 text-gray-700">{row.method}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {row.amount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        row.rawStatus === PaymentStatus.SUCCESS
                          ? "bg-green-50 text-green-700"
                          : row.rawStatus === PaymentStatus.PENDING
                          ? "bg-gray-100 text-gray-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      <span
                        className={`mr-2 h-2 w-2 rounded-full ${
                          row.rawStatus === PaymentStatus.SUCCESS
                            ? "bg-green-600"
                            : row.rawStatus === PaymentStatus.PENDING
                            ? "bg-gray-600"
                            : "bg-red-600"
                        }`}
                      />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
