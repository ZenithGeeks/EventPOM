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
    <div className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Recipient Detail</h2>
      <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
        <dt className="font-medium">Recipient Name</dt>
        <dd>{name}</dd>
        <dt className="font-medium">Recipient Bank</dt>
        <dd>{bank}</dd>
        <dt className="font-medium">Account No.</dt>
        <dd>{accountNo}</dd>
        <dt className="font-medium">Recipient Country</dt>
        <dd>{country}</dd>
      </dl>
    </div>
  );
}
