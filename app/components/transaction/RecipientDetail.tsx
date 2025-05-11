"use client";

import React from "react";

interface RecipientDetailProps {
  name: string;
  bank: string;
  accountNo: string;
  country: string;
}

export default function RecipientDetail({
  name,
  bank,
  accountNo,
  country,
}: RecipientDetailProps) {
  return (
    <div className="w-full px-4 py-2 sm:px-6 lg:px-8">
      <div className="bg-white border rounded-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 ">
          Recipient Detail
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 text-sm sm:text-base text-gray-700">
          <div>
            <dt className="font-medium text-gray-500">Recipient Name</dt>
            <dd className="mt-1">{name}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Recipient Bank</dt>
            <dd className="mt-1">{bank}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Account No.</dt>
            <dd className="mt-1">{accountNo}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Recipient Country</dt>
            <dd className="mt-1">{country}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
