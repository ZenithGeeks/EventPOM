"use client";
import { useState } from "react";
import QrCodeScanner from "@/app/components/Ticket/QRcode/QRCodeScanner";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 relative">
      {status === "scanning" && (
        <>
          <h1 className="text-xl font-bold mb-4">Scan To Enter</h1>
          <QrCodeScanner onScanSuccess={handleScanSuccess} />
          <button className="absolute bottom-10 text-sm text-gray-400">Turn On</button>
        </>
      )}

      {status === "invalid" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90">
          <div className="flex flex-col items-center justify-center gap-2 bg-white text-black p-6 rounded-lg text-center shadow-lg">
            <ExclamationCircleIcon className="h-14 w-14 text-red-600"/>
            <p className="text-red-600 font-bold">Invalid QR Code</p>
            <p className="text-sm text-gray-600 mt-2">Please check the QR code then try again</p>
            <Button
              variant={'content'}
              onClick={() => setStatus("scanning")}
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {status === "verified" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90">
          <div className="flex flex-col items-center bg-white text-black p-6 rounded-lg text-center shadow-lg">

            <CheckCircleIcon className="h-12 w-12 text-green-600" />
            <p className="text-green-600 font-bold">{scannedText}</p>
            <p className="text-sm text-gray-600 mt-2 font-bold">Note that the ticket is not reusable</p>
            <div className="flex items-center justify-center mt-4 gap-4">
              <Button  onClick={() => setStatus("scanning")}>
                Back
              </Button>
              <Button onClick={() => setStatus("scanning")} variant={"content"}>
                Scan Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
