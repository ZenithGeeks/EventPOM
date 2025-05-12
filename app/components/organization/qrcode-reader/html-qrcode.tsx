"use client";
import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log("QR Code:", decodedText);
      },
      (error) => {
        console.warn("QR Error:", error);
      }
    );

    return () => {
      scanner.clear().catch((error) => {
        console.warn("Failed to clear scanner:", error);
      });
    };
  }, []);

  return <div id="reader" />;
}
