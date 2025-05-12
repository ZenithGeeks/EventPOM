import { Scanner } from '@yudiel/react-qr-scanner';

export default function QRCodeScanner({ onScanSuccess }: { onScanSuccess: (decodedText: string) => void }) {
  return (
    <>
      <Scanner onScan={(result) => onScanSuccess(result[0].rawValue)} />
    </>
)}
