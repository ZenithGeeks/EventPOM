"use client";
import { useState } from "react";
import QrCodeScanner from "./reader";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function ScanPage() {
  const [scannedText, setScannedText] = useState<string>("");
  const [status, setStatus] = useState<"scanning" | "invalid" | "verified">("scanning");

  const handleScanSuccess = (decodedText: string) => {
    setScannedText(decodedText);
    if (decodedText === "valid_ticket") {
      setStatus("verified");
    } else {
      setStatus("invalid");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white p-6 relative">
      {status === "scanning" && (
        <>
          <h1 className="text-2xl font-bold mb-6 tracking-tight">🎫 Scan QR Code to Check In</h1>
          <div className="w-full sm:w-[400px] rounded-xl overflow-hidden shadow-lg border border-zinc-700 bg-zinc-950">
            <QrCodeScanner onScanSuccess={handleScanSuccess} />
          </div>
          <button className="absolute bottom-6 text-xs text-gray-400 underline">Need help scanning?</button>
        </>
      )}

      {status === "invalid" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center gap-3 bg-white text-black p-8 rounded-xl text-center shadow-xl w-full max-w-sm">
            <ExclamationCircleIcon className="h-16 w-16 text-red-600 animate-pulse" />
            <p className="text-xl text-red-600 font-semibold">Invalid QR Code</p>
            <p className="text-sm text-gray-600">กรุณาตรวจสอบ QR Code แล้วลองใหม่อีกครั้ง</p>
            <Button
              className="mt-4 w-full"
              variant="outline"
              onClick={() => setStatus("scanning")}
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      {status === "verified" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm">
          <div className="flex flex-col items-center bg-white text-black p-8 rounded-xl text-center shadow-xl w-full max-w-sm">
            <CheckCircleIcon className="h-16 w-16 text-green-600 animate-bounce" />
            <p className="text-xl font-semibold text-green-700 mt-2">Verified</p>
            <p className="text-base text-gray-800 font-medium mt-1">{scannedText}</p>
            <p className="text-sm text-gray-600 mt-2 font-medium">หมายเหตุ: บัตรนี้ไม่สามารถใช้ซ้ำได้</p>
            <div className="flex flex-col sm:flex-row items-center justify-center mt-6 gap-4 w-full">
              <Button className="w-full" onClick={() => setStatus("scanning")}>Back</Button>
              <Button className="w-full" onClick={() => setStatus("scanning")} variant="outline">Scan Next</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}